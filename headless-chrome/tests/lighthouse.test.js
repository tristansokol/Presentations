const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');


describe('Lighthouse tests', () => {

    test.skip('overview', async () => {
        function launchChromeAndRunLighthouse(url, opts, config = null) {
            return chromeLauncher.launch({ chromeFlags: opts.chromeFlags }).then(chrome => {
                opts.port = chrome.port;
                return lighthouse(url, opts, config).then(results => {
                    // use results.lhr for the JS-consumeable output
                    // https://github.com/GoogleChrome/lighthouse/blob/master/typings/lhr.d.ts
                    // use results.report for the HTML/JSON/CSV output as a string
                    // use results.artifacts for the trace/screenshots/other specific case you need (rarer)
                    return chrome.kill().then(() => results.lhr)
                });
            });
        }

        const opts = {
            chromeFlags: ['--show-paint-rects', '--headless']
        };

        // Usage:
        await launchChromeAndRunLighthouse('https://www.wikihow.com/Tie-Your-Shoes', opts).then(results => {
            // ["userAgent","lighthouseVersion","fetchTime","requestedUrl","finalUrl","runWarnings","audits","configSettings","categories","categoryGroups","timing"]
            //  ["performance","pwa","accessibility","best-practices","seo"]
            console.log(results.audits['speed-index']);
            console.log(JSON.stringify(Object.keys(results.audits)));
        });
    }, 20000);
    test('Timing', async () => {
        function launchChromeAndRunLighthouse(url, opts, config = null) {
            return chromeLauncher.launch({ chromeFlags: opts.chromeFlags }).then(chrome => {
                opts.port = chrome.port;
                return lighthouse(url, opts, config).then(results => {
                    return chrome.kill().then(() => results.lhr)
                });
            });
        }

        const opts = {
            chromeFlags: ['--show-paint-rects', '--headless']
        };
        await launchChromeAndRunLighthouse('https://www.wikihow.com/Tie-Your-Shoes', opts).then(results => {
            expect(results.audits['speed-index'].score * 100).toBeGreaterThan(80);
        });
    }, 20000);
    test('Aria', async () => {
        function launchChromeAndRunLighthouse(url, opts, config = null) {
            return chromeLauncher.launch({ chromeFlags: opts.chromeFlags }).then(chrome => {
                opts.port = chrome.port;
                return lighthouse(url, opts, config).then(results => {
                    return chrome.kill().then(() => results.lhr)
                });
            });
        }

        const opts = {
            chromeFlags: ['--show-paint-rects', '--headless']
        };
        await launchChromeAndRunLighthouse('https://www.wikihow.com/Tie-Your-Shoes', opts).then(results => {
            // ARIA roles must have valid values in order to perform their intended accessibility functions. [Learn more](https://dequeuniversity.com/rules/axe/2.2/aria-roles?application=lighthouse)
            expect(results.audits['aria-roles'].score).toEqual(1);
            expect(results.audits['aria-allowed-attr'].score).toEqual(1);
            expect(results.audits['aria-required-attr'].score).toEqual(1);
            expect(results.audits['aria-required-children'].score).toEqual(1);
            expect(results.audits['aria-required-parent'].score).toEqual(1);
            expect(results.audits['aria-valid-attr-value'].score).toEqual(1);
            expect(results.audits['aria-valid-attr'].score).toEqual(1);
        });
    }, 20000);
    test('robots-txt', async () => {
        function launchChromeAndRunLighthouse(url, opts, config = null) {
            return chromeLauncher.launch({ chromeFlags: opts.chromeFlags }).then(chrome => {
                opts.port = chrome.port;
                return lighthouse(url, opts, config).then(results => {
                    return chrome.kill().then(() => results.lhr)
                });
            });
        }

        const opts = {
            chromeFlags: [ '--headless']
        };
        await launchChromeAndRunLighthouse('https://www.wikihow.com/Tie-Your-Shoes', opts).then(results => {
            // AIf your robots.txt file is malformed, crawlers may not be able to understand how you want your website to be crawled or indexed.

            console.log(results.audits['robots-txt'])
            expect(results.audits['robots-txt'].score).toEqual(1);
        });
    }, 20000);

});

