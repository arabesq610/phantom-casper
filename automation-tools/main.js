(function () {
    'use strict';

    var casper,
        tests,
        testIndex = 1,
        message = 'OMG';

    // Bring the Casper
    casper = require('casper').create(); // Why we have to run the create immediately?

    // Create our tests
    tests = [{
        name: 'google',
        url: 'https://www.google.com/',
        screenshotOutputLocation: './output/google.png'
    }, {
        name: 'eliselinn',
        url: 'http://www.eliselinn.com/',
        screenshotOutputLocation: './output/eliselinn.png'
    }];


    // console.log(tests[testIndex].name, tests[testIndex].url, tests[testIndex].screenshotOutputLocation);

    // Get the page title plus our fancy message
    casper.start(tests[testIndex].url, function () {
        var title = this.evaluate(function (message) {
            return message + ' ' + document.title;
        }, message);

        casper.echo('Page title is ' + title);
        // this.capture(tests[testIndex].screenshotOutputLocation);
    });

    casper.run();

    // casper.exit();

}());
