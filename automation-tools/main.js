/*global window, JSON*/
(function () {
    'use strict';


    var casper,
        fs,
        evalObj,
        tests,
        testIndex = 2,
        casperSettingsObj = null;
    /* { // One option is to override the UA, but this won't get around detecation of headless browsers (i.e., PhantomJS, or 'Mozilla/5.0 (Macintosh; Intel Mac OS X) AppleWebKit/538.1 (KHTML, like Gecko) CasperJS/1.1.0-beta5+PhantomJS/2.1.1 Safari/538.1')
        pageSettings: {
            userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36'
        }
    } */


    // Bring the Casper
    casper = require('casper').create(casperSettingsObj); // Why we have to run the create immediately? Not sure.


    // Bring filesystem
    fs = require('fs');


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
    }, {
        name: 'packtpub',
        url: 'https://www.packtpub.com/packt/offers/free-learning',
        screenshotOutputLocation: './output/packtpub.png'
    }];

    // Some info about the remote page we're about to dive into
    // console.log(tests[testIndex].name, tests[testIndex].url, tests[testIndex].screenshotOutputLocation);


    // Output the page title
    casper.start(tests[testIndex].url, function () {
        console.log('hi');
    });
    casper.wait(1000, function () {
        // Note `this` refers to the casper object inside the remote page context

        this.capture(tests[testIndex].screenshotOutputLocation);


        evalObj = this.evaluate(function () {
            var username,
                password;

            username = document.getElementById('email');
            password = document.getElementById('password');

            // This allows us to see the UA which we can use to emulate in chrome and see the page as it's rendered to us while running as PhantomJS
            // console.log(window.navigator.userAgent);

            // Return something useful
            return {
                username: username,
                password: password
            };
        });

        console.log(evalObj);


    });



    casper.run(function () {
        fs.write('./output/data.json', JSON.stringify(evalObj, null, '\t'));
        this.exit();
    });

}());
