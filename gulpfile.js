'use strict';

var libs = require('./libs.json'),
    lintRules = require('./.eslintrc.json'),
    paths = {
        fonts : './node_modules/bootstrap-sass/assets/fonts/bootstrap/*',
        img: {
            src: './src/img/**/*',
            dest: './build/assets/img/'
        },
        data: {
            src: './src/app/data/*',
            dest: './build/assets/data/'
        },
        scss : {
            src : './src/styles/styles.scss',
            dest : './build/assets/css/'
        },
        build : {
            css : './build/assets/css/',
            fonts: './build/assets/fonts/',
            js: './build/js/'
        }
    },
    cssStyle = 'expanded',
    serverConfig = {
        port: 8888,
        path: '.'
    };

var gulp            = require('gulp-help')(require('gulp')),  //displays task description with gulp help
    addStream       = require('add-stream'),  //Appends the content of one stream on another
    annotate        = require('gulp-ng-annotate'), //Annotates array dependency injection syntax for Angular
    autoprefixer    = require('autoprefixer'), // PostCSS plugin to auto-prefix CSS styles for cross browser compatibility
    clean           = require('gulp-clean'),  // Delete a specified folder
    concat          = require('gulp-concat'), // Concatenate streams into one file
    copy            = require('gulp-copy'),  // Self explanatory
    debug           = require('gulp-debug'), // Displays name of current running task in console
    eslint          = require('gulp-eslint'), // Source file linter
    liveServer      = require('gulp-live-server'), // Node server with live reload
    rename          = require('gulp-rename'),  // Rename a file
    runsequence     = require('run-sequence'),  // Run a series of tasks in sequence
    plumber         = require('gulp-plumber'),  // Stop pipe breakage from plugin errors
    postcss         = require('gulp-postcss'),  // PostCSS method to apply plugins to CSS
    sass            = require('gulp-sass'),  // Compile SCSS/SASS files to css
    sourcemaps      = require('gulp-sourcemaps'), //Build sourcemaps of JS concatenation
    templates       = require('gulp-angular-templatecache'),
    uglify          = require('gulp-uglify'),
    util            = require('gulp-util'),
    watch           = require('gulp-watch');

// Handle template processing into Angular's TemplateCache module
function processTemplates() {
    return gulp.src('./src/app/modules/**/*.html')
        .pipe(templates())
}

function logger(err) {
    util.log(err.message + '\non line [' + err.lineNumber + '] in file [' + err.fileName + ']');
}

gulp.task('app-build', 'Build the project\'s JS dependencies', function () {
    return gulp.src('./src/**/*.js')
        .pipe(debug({
            title: 'Angular Build',
            minimal: false
        }))
        .pipe(plumber())
        .pipe(sourcemaps.init())  //Initialize sourcemaps
        .pipe(concat('app.js'))  //Concatenate all angular files to one file
        .pipe(addStream.obj(processTemplates())) //Need this to add angular views to TemplateCache
        .pipe(concat('app.js')) //Ensures templateCache is included in concat file
        .pipe(annotate()) // annotate for dependency injection
        .pipe(sourcemaps.write('.')) //write sourcemap
        .pipe(gulp.dest(paths.build.js)) //write un-minified file
        .pipe(rename('app.min.js'))  // rename file to min.js for minfication.  Don't want to overwrite original
        .pipe(uglify()) //Minify code
        .on('error', function(err) {
            logger(err);
        })
        .pipe(gulp.dest(paths.build.js)); //write minified file
});

// Annotate all angular files to fit array dependency injection syntax
gulp.task('annotate', 'Annotates all angular source files with injection dependencies', function() {
    return gulp.src('./src/app/**/*.js')
        .pipe(debug({
            title: 'Annotation',
            minimal: false
        }))
        .pipe(sourcemaps.init())
        .pipe(annotate())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./build/js'));
});

//Deletes build folder
gulp.task('clean', 'Cleans build folder', function () {
    return gulp.src('./build')
        .pipe(clean())
});

gulp.task('vendor-build', 'Concatenates and minifies all third party vendor libraries to one file', function () {
    var sources = libs.npm.full.concat(libs.npm.extras); //Concatenate full source files into one array

    return gulp.src(sources, {cwd : './node_modules'})
        .pipe(debug({
            title: 'Vendor Concatenation',
            minimal: false
        }))
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(concat('vendors.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.build.js))
        .pipe(rename('vendors.min.js'))
        .pipe(uglify())
        .on('error', function(err) {
            logger(err);
        })
        .pipe(gulp.dest(paths.build.js));
});

gulp.task('copy', 'Copies all relevant files to build folder', function () {
    gulp.src(paths.fonts)
        .pipe(debug({
            title: 'Copy Fonts',
            minimal: false
        }))
        .pipe(gulp.dest(paths.build.fonts));

    gulp.src(paths.img.src)
        .pipe(debug({
            title: 'Copy Images',
            minimal: false
        }))
        .pipe(gulp.dest(paths.img.dest));

    gulp.src(paths.data.src)
        .pipe(debug({
            title: 'Copy Data',
            minimal: false
        }))
        .pipe(gulp.dest(paths.data.dest));
});

gulp.task('postcss', 'Process CSS with specified plugins', function () {
    var processors = [
        autoprefixer({browsers : ['last 2 version']})
    ];

    return gulp.src(paths.build.css + '*.css')
        .pipe(debug({
            title: 'PostCSS',
            minimal: false
        }))
        .pipe(sourcemaps.init())
        .pipe(postcss(processors, {
            diff: true
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.build.css));
});

gulp.task('sass', 'Compiles modular SCSS files to one css file', function () {
    return gulp.src(paths.scss.src)
        .pipe(debug({
            title: 'SCSS Compilation',
            minimal: false
        }))
        .pipe(plumber())
        .pipe(sass({
            outputStyle: cssStyle,
            sourceComments: true
        }))
        .pipe(gulp.dest(paths.scss.dest));
});

gulp.task('watch', 'Sets file watchers for project source files for re-compliation', function () {
    gulp.watch(['./src/**/*.scss'], ['sass']);
    gulp.watch(['./src/**/*.js', './src/modules/**/*.html'], ['app-build']);
});

gulp.task('server', 'Starts node server running on port [' + serverConfig.port + ']', function () {
    var server = liveServer.static(serverConfig.path, serverConfig.port);
    server.start();

    gulp.watch(['./src/**/*.scss'], ['sass', 'postcss']);
    gulp.watch(['./src/**/*.js', './src/app/modules/**/*.html'], ['app-build']);
});

gulp.task('default', 'Start node server and file watchers', ['server']);

gulp.task('build', 'Clean and build all source code and styles', function () {
    runsequence(['clean', 'copy', 'vendor-build', 'js-build',  'sass', 'postcss']);
});
