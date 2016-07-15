/**
 *
 * @author Jason Johns <jason@academiccatalog.com>
 * Created on 7/15/16.
 */

module.exports = function(config) {

    var libs = require('../../libs.json'),
        sources = [
            'build/js/vendors.js',
            'build/js/app.js',
            'tests/unit/**/*.spec.js'
        ];

    for (var i = 0; i < libs.npm.full; i++)
        sources.append('node_modules/' + libs.npm.full[i]);

    config.set({
        basePath: '../../',
        frameworks: ['jasmine'],
        browsers: ['Chrome'],
        autoWatch: true,
        plugins: [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine'
        ],
        files: sources
        
    });
};