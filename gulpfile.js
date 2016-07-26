'use strict';

//Define gulp and plugin modules 
const   gulp            = require('gulp-help')(require('gulp')),  //displays task description with gulp help
        addStream       = require('add-stream'),  //Appends the content of one stream on another
        annotate        = require('gulp-ng-annotate'), //Annotates array dependency injection syntax for Angular
        autoprefixer    = require('autoprefixer'), // PostCSS plugin to auto-prefix CSS styles for cross browser compatibility
        babelify        = require('babelify'),
        browserify      = require('browserify'),
        browserify_annotate = require('browserify-ngannotate'),
        browserSync     = require('browser-sync').create(),
        clean           = require('gulp-clean'),  // Delete a specified folder
        concat          = require('gulp-concat'), // Concatenate streams into one file
        copy            = require('gulp-copy'),  // Self explanatory
        debug           = require('gulp-debug'), // Displays name of current running task in console
        eslint          = require('gulp-eslint'), // Source file linter
        gulpif          = require('gulp-if'), // ternary gulp plugin - conditionally control the flow of file objects
        liveServer      = require('gulp-live-server'), // Node server with live reload
        merge           = require('merge-stream'),
        notify          = require('gulp-notify'),
        rename          = require('gulp-rename'),  // Rename a file
        runsequence     = require('run-sequence'),  // Run a series of tasks in sequence
        plumber         = require('gulp-plumber'),  // Stop pipe breakage from plugin errors
        postcss         = require('gulp-postcss'),  // PostCSS method to apply plugins to CSS
        sass            = require('gulp-sass'),  // Compile SCSS/SASS files to css
        //sass            = require('gulp-ruby-sass'),
        sassLint        = require('gulp-sass-lint'), //Lint SCSS files
        source          = require('vinyl-source-stream'),
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

let interceptErrors = function(error) {
    let args = Array.prototype.slice.call(arguments);

    //send error to notification center with gulp-notify
    notify.onError({
        title: 'Compile Error',
        message: '<%= error.message %>'
    }).apply(this, args);

    //keep gulp from hanging on this task
    this.emit('end');

};

gulp.task('browserify', 'Compile ES6 project code and bundle with all libraries.', ['views'], () => {
    return browserify('./src/js/app.js')
        .transform(babelify, {presets : ['es2015']})
        .transform(browserify_annotate)
        .bundle()
        .on('error', interceptErrors)
        .pipe(source('main.js'))
        .pipe(gulp.dest('./build/js/'));
});

gulp.task('clean', 'Delete build folder', () => {
    return gulp.src(['./build', './dist'])
        .pipe(clean());
});

gulp.task('html', 'Copy index.html file to build location', () => {
    return gulp.src('./src/index.html')
        .on('error', interceptErrors)
        .pipe(gulp.dest('./build'));
});

gulp.task('views', 'Compile Angular template view files to $templateCache', () => {
    return gulp.src('./src/**/*.html')
        .pipe(debug({
            tile: 'Template Compile',
            minimal: false
        }))
        .pipe(templates({
            standalone: true
        }))
        .on('error', interceptErrors)
        .pipe(rename('templates.js'))
        .pipe(gulp.dest('./src/js/config/'));
});


gulp.task('sass', 'Compiles modular SCSS files to one css file', () => {
    return gulp.src('./src/**/*.scss')
        .pipe(debug({
            title: 'SCSS Compilation',
            minimal: false
        }))
        .pipe(plumber())
        .pipe(sass({
            outputStyle: 'expanded',
            sourceComments: true,
            includePaths: ['./src/**/']
        }))
        .pipe(gulp.dest('./build/css/'));

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

gulp.task('build','Main build task, produces minfied bundle file',  ['html', 'browserify', 'sass'], () => {
    let html = gulp.src('./build/index.html')
        .pipe(gulp.dest('./dist/'));

    let js = gulp.src('./build/js/main.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist/'));


    return merge(html, js);
});

gulp.task('default', 'Executes a re-build and starts web server with file watchers', ['html', 'browserify','sass'], () => {
    browserSync.init(['./build/**/**.**'], {
        server: './build',
        port: 4000,
        notify: false,
        ui: {
            port: 4001
        }
    }) ;

    gulp.watch('./src/index.html', ['html']);
    gulp.watch('./src/js/**/*.html', ['views']);
    gulp.watch('./src/js/**/.*.js', ['browserify']);
    gulp.watch('./src/**/*.scss', ['sass']);
});

