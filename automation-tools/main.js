var casper = require('casper').create({
    verbose: true
});
var urls = ['http://www.google.ca', 'http://www.bing.ca', 'http://packtpub.com'];
var viewportSizes = [480, 720, 1200]; // widths
var counter = 0;

// console.log(urls);
console.log(viewportSizes);


casper
    .start()
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
