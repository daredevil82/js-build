## Gulp Build System Demonstration

A demonstration project to showcase the uses of Gulp for an Angular 1.5.x project.  

Prior to starting this demonstration, ensure `gulp babel` have been installed via `npm` and are available in the global CLI.

* type `npm install` in the console in the `js-build` directory to install all project dependencies
* type `gulp build` to execute the build process and start the node server running at `http://localhost:8888`

For more details opf the build, type `gulp help` in the command line, and view the gulpfile at `./gulpfile.js`

## Build Description

There are so many ways to implement a JS build system, with `webpack`, `browserify`, `commonJS`, `requireJS`, etc.  This is an attempt at a simple task runner that

* Copies all font and image files to build location
* Concatenates all third-party source code into one file, generates a sourcemap and minifies.
* Concatenates all project source code into one file with a sourcemap and minified version.
    * Angular project code uses `ng-annotate` to inject array-based dependencies to ease development.
    * Style rules are described in `./.eslintrc.json` and enforced using the `gulp-eslint` plugin.
    * HTML templates are compiled to Angular TemplateCache via `gulp-angular-templatecache`
* Compiles all SCSS styles into CSS and processes us ing PostCSS plugins
* Starts a node dev server at `http://localhost:8888` 
    * `livereload` is available, but not configured here
    
In order to access the source files for third party libraries and plugins, we have to know where they are.  I've created a `libs.json` file in the project root
that contains the file path in `node_modules` to the full and/or minified version of the required library.  If no minified version exists, it is added to the `extras` 
array.  These file paths are then concatenated into one array at build time and used for concatenation.  The result of this is the `vendors.js` file in `./build/js` folder.

### Tasks
Defined Tasks in `gulpfile.js` that are executable via `gulp $NAME` with the exception of the `default` task

* default - Starts the node server and file watchers without any linting.  No build executing.
* annotation - Executes `gulp-ng-annotate` on application source code so that array-based dependency injection is not needed.
* app-build - Executes the build process for application source code.  Responsible for concatenating module files into one, minifying, linting and exporting to build folder
* build - Executes an entire project build starting by cleaning existing build then executing

    * copy font, image and data assets to build folder
    * `app-build` task
    * `vendor-build` task
    * `sass` task to compile all SCSS files
    * `postcss` task to apply PostCSS plugins to compiled CSS file
    * linters `sass-lint` and `js-lint` for SCSS & JS files, respectively
    
* clean - delete `./build` folder
* copy - copy data, font and images to './build/assets'
* help - display task names and short description
* jslint - Apply [`eslint`](http://eslint.org/) rules to compiled application code.
* postcss - Apply selected [`PostCSS`](http://postcss.org/) plugins to compiled CSS styles
* sass - Compile SASS/SCSS files to CSS
* sass-lint - Apply [`scss-lint`](https://github.com/brigade/scss-lint) rules to SASS/SCSS files
* server - Start node server running on `http://localhost:8888` without linters
* server-linter - Same as `server`, but includes `jslint` and `sass-lint` with file watchers.  This can be resource-intensive, so use sparingly.
* vendor-build - Concatenates and minifies the third-party files in `./libs.json` to one vendor file and generates sourcemap.
* watch - Set file watchers to trigger re-compilation of SCSS/JS/HTML files in project.  No linters activated.
* watch-linter - Same as `watch`, but includes `jslint` and `sass-lint` with file watchers.  Same with `server-linter`, the number of file watchers activated can be resource intensive, so use sparingly.

 


### Advantages

* No modular syntax or import statements required to get third party library code available in your project.
* Produces separate third party vendor sourcefile for inclusion in a CDN that can be updated separately from the project. 

### Disadvantages

* Requires adding a file path for each new library added to the project.  Need to maintain both full and minified versions
* Somewhat different from current best practices. 

## Angular PhoneCat Demonstration

In addition to the build system demonstration, this is an adaptation of the [Angular Phonecat Tutorial](https://docs.angularjs.org/tutorial/0) using suggestions from 
[Todd Motto](https://github.com/toddmotto/angular-styleguide) and [John Papa's](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md) styleguides.

Specifically, this breaks apart the various project parts into feature modules.  Typically, many small demonstrations follow a 'group by type' project structure where 
components, controllers, templates, services and directives all reside in their specific folders irrespective of area of concern.  Here, I've structured this project by
feature, in which each module contains only the code required for structure, functionality and styling.  Any modules that are intended for reusability should go into 
`app/common/$MODULE_NAME`.

### Testing
All project code has both unit and end-to-end tests.  Unit tests are run using the [`Karma`](https://karma-runner.github.io/1.0/index.html) test runner using the 
[`Jasmine`](http://jasmine.github.io/2.4/introduction.html) behavior-driven testing framework.  End to end tests use [`Protractor`](http://www.protractortest.org/#/) to
run tests in the browser, simulating user interaction.

Test scripts are described in the `tests` section of `./package.json`.  Karma tests are run using `npm test`, and Protractor are executed via `npm protractor`.