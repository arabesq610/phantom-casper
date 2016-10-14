(function () {
    'use strict';


    var casper,
        tests,
        testIndex = 1;


    // Bring the Casper
    casper = require('casper').create(); // Why we have to run the create immediately?


    // Event handler for console logs in the remote page context
    casper.on('remote.message', function (msg) {
        console.log('remote message: ' + msg);
    });


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

    // Output the page title
    casper.start(tests[testIndex].url, function () {
        // Note `this` refers to the casper object inside the remote page context

        // Log some helpful info
        console.log(this.getTitle());
        console.log(this.getCurrentUrl());

        // this.capture(tests[testIndex].screenshotOutputLocation);
    });

    casper.run();

    // casper.exit();

}());
