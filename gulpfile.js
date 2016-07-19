'use strict';


// Define paths to source/dest files and global vars
const libs = require('./libs.json'),
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

//Define gulp and plugin modules 
const   gulp            = require('gulp-help')(require('gulp')),  //displays task description with gulp help
        addStream       = require('add-stream'),  //Appends the content of one stream on another
        annotate        = require('gulp-ng-annotate'), //Annotates array dependency injection syntax for Angular
        autoprefixer    = require('autoprefixer'), // PostCSS plugin to auto-prefix CSS styles for cross browser compatibility
        clean           = require('gulp-clean'),  // Delete a specified folder
        concat          = require('gulp-concat'), // Concatenate streams into one file
        copy            = require('gulp-copy'),  // Self explanatory
        debug           = require('gulp-debug'), // Displays name of current running task in console
        eslint          = require('gulp-eslint'), // Source file linter
        gulpif          = require('gulp-if'), // ternary gulp plugin - conditionally control the flow of file objects
        liveServer      = require('gulp-live-server'), // Node server with live reload
        rename          = require('gulp-rename'),  // Rename a file
        runsequence     = require('run-sequence'),  // Run a series of tasks in sequence
        plumber         = require('gulp-plumber'),  // Stop pipe breakage from plugin errors
        postcss         = require('gulp-postcss'),  // PostCSS method to apply plugins to CSS
        sass            = require('gulp-sass'),  // Compile SCSS/SASS files to css
        //sass            = require('gulp-ruby-sass'),
        sassLint        = require('gulp-sass-lint'), //Lint SCSS files
        sourcemaps      = require('gulp-sourcemaps'), //Build sourcemaps of JS concatenation
        templates       = require('gulp-angular-templatecache'), // Compile Angular HTML templates to $TEMPLATECACHE
        uglify          = require('gulp-uglify'), // Minifies JS code
        util            = require('gulp-util'),  // Useful Gulp utilities that aren't part of main project.
        watch           = require('gulp-watch');

const   fs              = require('fs');

// Handle template processing into Angular's TemplateCache module
function processTemplates() {
    return gulp.src('./src/app/**/*.html')
        .pipe(debug({
            title: 'Processing Templates',
            minimal: false
        }))
        .pipe(templates())
}

// Use gulp util.log functionality for error reporting 
function logger(err) {
    util.log(err.message + '\non line [' + err.lineNumber + '] in file [' + err.fileName + ']');
}

// Ensure lint output directory exists
function createLintOutput() {
    if (!fs.existsSync('./lint'))
        fs.mkdirSync('lint');
}

gulp.task('app-build', 'Concatenate, minify and process the project\'s source code dependencies', () => {
    return gulp.src('./src/**/*.js')
        .pipe(debug({
            title: 'Angular Build',
            minimal: false
        }))
        .pipe(plumber())
        .pipe(sourcemaps.init())  //Initialize sourcemaps
        .pipe(concat('app.js'))  //Concatenate all angular files to one file
        .pipe(annotate()) // annotate for dependency injection
        .pipe(addStream.obj(processTemplates())) //Need this to add angular views to TemplateCache
        .pipe(concat('app.js')) //Ensures templateCache is included in concat file
        .pipe(sourcemaps.write('.')) //write sourcemap
        .pipe(gulp.dest(paths.build.js)); //write un-minified file
        //.pipe(rename('app.min.js'))  // rename file to min.js for minfication.  Don't want to overwrite original
        //.pipe(uglify()) //Minify code
        // .on('error', function(err) {
        //     logger(err);
        // })
        // .pipe(gulp.dest(paths.build.js)); //write minified file
});

// Annotate all angular files to fit array dependency injection syntax
gulp.task('annotate', 'Annotates all angular source files with injection dependencies', () => {
    return gulp.src('./src/app/**/*.js')
        .pipe(debug({
            title: 'Annotation',
            minimal: false
        }))
        .pipe(plumber())
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

gulp.task('copy', 'Executes copy-{data, fonts, images} subtasks', ['copy-data', 'copy-fonts', 'copy-images']);

gulp.task('copy-data', 'Copies all data JSON files to build folder', () => {

    return gulp.src(paths.data.src)
        .pipe(debug({
            title: 'Copy Data',
            minimal: false
        }))
        .pipe(gulp.dest(paths.data.dest));
});

gulp.task('copy-fonts', 'Copies fonts from Bootstrap dependencies to build folder', () => {
    return gulp.src(paths.fonts)
        .pipe(debug({
            title: 'Copy Fonts',
            minimal: false
        }))
        .pipe(gulp.dest(paths.build.fonts));
});

gulp.task('copy-images', 'Copies images from source assets to build', () => {
    return gulp.src(paths.img.src)
        .pipe(debug({
            title: 'Copy Images',
            minimal: false
        }))
        .pipe(gulp.dest(paths.img.dest));
});

gulp.task('jslint', 'Lint all project JS source code using eslint rules', () => {
    createLintOutput();

    return gulp.src(['./src/**/*.js', './!node_modules/**'])  // ignore files in node_modules
        .pipe(eslint()) //attaches the lint output to the `eslint` property of the file object so it can be used elsewhere
        .pipe(eslint.format('table'))
        .pipe(eslint.format('unix', fs.createWriteStream('./lint/jslint.txt'))) //outputs the lint results to the console
        .pipe(eslint.failAfterError()); //have linter fail after error

});

gulp.task('postcss', 'Process CSS with specified plugins', () => {
    const processors = [
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

gulp.task('sass', 'Compiles modular SCSS files to one css file', () => {
    return gulp.src(paths.scss.src)
        .pipe(debug({
            title: 'SCSS Compilation',
            minimal: false
        }))
        .pipe(plumber())
        .pipe(sass({
            outputStyle: cssStyle,
            sourceComments: true,
            includePaths: ['./src/app/']
        }))
        .pipe(gulp.dest(paths.scss.dest));

});

gulp.task('sass-lint', 'Lint SCSS files using configurations', () => {
    createLintOutput();

    return gulp.src('./src/**/*.scss')
        .pipe(sassLint({
            configFile: './sasslintrc.json', //empty file for now
        }))
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError());
});

gulp.task('vendor-build', 'Concatenates and minifies all third party vendor libraries to one file', () => {
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

gulp.task('watch', 'Sets file watchers for project source files for re-compilation', () => {
    gulp.watch('./libs.json', ['vendor-build']);
    gulp.watch(['./src/**/*.scss'], ['sass', 'postcss']);
    gulp.watch(['./src/**/*.js', './src/app/modules/**/*.html'], ['app-build']);
});

gulp.task('watch-linter', 'Sets file watchers for project source files to re-compile.  Includes linter functionality', () => {
    gulp.watch(['./src/**/*.scss'], ['sass', 'postcss', 'sass-lint']);
    gulp.watch(['./src/**/*.js', './src/app/modules/**/*.html'], ['app-build', 'js-lint']);
});

gulp.task('default', 'Start node server and file watchers without linters', ['server']);

gulp.task('server', 'Starts node server running on port [' + serverConfig.port + ']', () => {
    const server = liveServer.static(serverConfig.path, serverConfig.port);
    server.start();

    gulp.start('watch');
});

gulp.task('server-linter', 'Starts node server running on port [' + serverConfig.port + '] and runs linters', ['server'], () => {
    gulp.watch(['./src/**/*.scss'], ['sass', 'postcss', 'sass-lint']);
    gulp.watch(['./src/**/*.js', './src/app/modules/**/*.html'], ['app-build', 'jslint']);
});

gulp.task('build', 'Clean and build all source code and styles and execute linters', () => {
    runsequence('clean', 'copy', 'vendor-build', 'app-build',
        'sass', 'postcss', 'jslint', 'sass-lint');
});
