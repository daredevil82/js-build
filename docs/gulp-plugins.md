# Gulp Plugins

`Do one thing, and do it well`

is the philosophy that Gulp plugins should follow.  

This project uses several of them

* [`gulp-help`](https://www.npmjs.com/package/gulp-help) displays a task description when `gulp help` is executed.  Description is the second argument in the `gulp.task` definition.
* [`gulp-ng-annotate`](https://www.npmjs.com/package/gulp-ng-annotate) allows Angular dependency injection syntax to be left to a plugin.  So, instead of writing a module like
  
```
angular.module('some-module', [])
    .controller(['http', $log', function SomeCtrl(http, $log) { ... }]);
```
  
it can be written like 
```.controller(function SomeCtrl(http, $log) { ... });```

* [`autoprefixer`](https://www.npmjs.com/package/autoprefixer) is a [PostCSS plugin](http://postcss.org/) that automatically sets vendor prefixes for CSS rules based on [Can I Use](http://www.caniuse.com)
* [`gulp-clean`](https://www.npmjs.com/package/gulp-clean) plugin to remove files and folders.  Deprecated in favor of [another method](https://github.com/gulpjs/gulp/blob/master/docs/recipes/delete-files-folder.md) but remains highly useful and simple to use
* [`gulp-concat`](https://www.npmjs.com/package/gulp-concat) concatenates files in the order specified when creating the stream
* [`gulp-copy`](https://www.npmjs.com/package/gulp-copy) copies files from one location to another.  Used to simplify font and image file sources and application data.
* [`gulp-debug`](https://www.npmjs.com/package/gulp-debug) prints currently executing task and other info to console
* [`gulp-eslint`](https://www.npmjs.com/package/gulp-eslint) applies [eslint](http://eslint.org/) linting rules to codebase
* [`gulp-live-server`](https://www.npmjs.com/package/gulp-live-server) serves up static files and folders in a development environment
* [`gulp-rename`](https://www.npmjs.com/package/gulp-rename) renames a file stream
* [`runsequence`](https://www.npmjs.com/package/runsequence) is a Gulp hack to ensure tasks run in a specified sequence.  Useful for Gulp 3.9.x, will be obsolete on the 4.x release
* [`gulp-plumber`](https://www.npmjs.com/package/gulp-plumber) overrides the default Node `pipe()` method to keep streams open on plugin error or failure
* [`gulp-postcss`](https://www.npmjs.com/package/gulp-postcss) pipes CSS file streams through several processor plugins
* [`gulp-sass`](https://www.npmjs.com/package/gulp-sass) compiles SCSS sources to CSS stylesheets
* [`gulp-sass-lint`](https://www.npmjs.com/package/gulp-sass-lint) applies linting rules to SCSS files
* [`gulp-sourcemaps`](https://www.npmjs.com/package/gulp-sourcemaps) writes inline or external sourcemaps for compiled files.  Plugins used in between `init` and `write` must support this plugin
* [`gulp-angular-templatecache`](https://www.npmjs.com/package/gulp-angular-templatecache) pre-compiles all angular template views to $templateCache
* [`gulp-uglify`](https://www.npmjs.com/package/gulp-uglify) minfies JS files with [UglifyJS](https://www.npmjs.com/package/uglifyjs)
* [`gulp-util`](https://www.npmjs.com/package/gulp-util) contains some utility functions for plugins.

[Home](../README.md)
[Previous](gulp.md)
[Next](gulp-tasks.md)