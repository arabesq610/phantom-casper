var casper,
    config,
    counter,
    data,
    fs,
    urls,
    viewportSizes;

// Require
casper = require('casper')
    .create({
        verbose: true
    });

fs = require('fs');

// Check
// if (fs.exists('./config.json') && fs.exists('./data.json')) {
//     data = require('./data.json');
//     config = require('./counter.json');
// } else {
//     casper.exit();
// }

// Init
urls = ["http://www.google.ca", "http://www.bing.ca", "http://packtpub.com"]; //data.urls;
viewportSizes = [480, 720, 1200]; //config.viewportSizes;


// Run
casper.start();

counter = 0;

casper
    .repeat(viewportSizes.length, function () {
        'use strict';
        var viewportSize = viewportSizes[counter];

        casper
            .viewport(viewportSize, 1000)
            .each(urls, function (self, item, index) {
                self.thenOpen(item, function () {
                    var title = this.getTitle();
                    console.log(title);

                    this.wait(2000, function () {
                        this.capture('./images/screenshot_' + index + '_' + viewportSize + '.png');
                    });
                });
            });
        counter += 1;

    });

casper.run();

// casper.exit();
