exports.config = {
    allScriptsTimeout: 11000,
    framework: 'jasmine',
    baseUrl: 'http://localhost:8888',
    specs: ['*.js'],
    capabilities: {
        'browserName': 'chrome'
    },
    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000
    }
};