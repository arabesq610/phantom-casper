(function () {
    'use strict';

    var casper,
        tests,
        testIndex = 1;


    casper = require('casper').create(); // Why we have to run the create immediately?

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

    // Generate the screenshot
    casper.start(tests[testIndex].url, function () {
        var title = this.evaluate(function () {
            return document.title;
        });

        casper.echo('page title is ' + title);
        // this.capture(tests[testIndex].screenshotOutputLocation);
    });

    casper.run();

    // casper.exit();

}());
