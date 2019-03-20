const puppeteer = require('puppeteer');
beforeAll(async () => {
    browser = await puppeteer.launch({
        // headless: false,
        slowMo: 80,
        //   args: [`--window-size=${width},${height}`]
    });
    page = await browser.newPage();
    // await page.setViewport({ width, height });
});
afterAll(() => {
    browser.close();
});


describe('Page performance', () => {


    test.skip('page metrics', async () => {

        await page.goto('https://www.wikihow.com/Tie-Your-Shoes');
        console.log(await page.metrics());
        // const pageTitle = await page.title();
        // const metaDescription = await page.$eval("head > meta[name='description']", element => element.textContent);

        // keywords.forEach(keyword => {
        //     expect(pageTitle.toLowerCase()).toMatch(keyword);
        // });
    }, 20000);
    test('time to first paint', async () => {

        await page.goto('https://www.wikihow.com/Tie-Your-Shoes');
        const paints = await page.evaluate(_ => {
            const result = {};
            performance.getEntriesByType('paint').map(entry => {
                result[entry.name] = entry.startTime;
            });
            return result;
        });

        for (const [key, val] of Object.entries(paints)) {
            // if(key == 'first-contentful-paint'){
            //     expect(val).toBeLessThan(100)
            // }
            console.log(`${key}: ${Math.round(val)}ms`);
        }

        expect(paints['first-contentful-paint']).toBeLessThan(100)
    }, 20000);
    test.skip('time to first paint', async () => {

        await page.goto('https://www.wikihow.com/Tie-Your-Shoes');
        const pageTiming = await page.evaluate(_ => {
            return performance.toJSON();
        });
        for (const event in pageTiming.timing) {
            if (pageTiming.timing.hasOwnProperty(event)) {
                console.log(event, Math.round(pageTiming.timing[event] - pageTiming.timeOrigin), 'ms')
            }
        }
        //     secureConnectionStart -1533139305283 ms
        //     redirectStart -1533139305283 ms
        //     redirectEnd -1533139305283 ms
        //     navigationStart 0 ms
        //     fetchStart 0 ms
        //     domainLookupStart 0 ms
        //     domainLookupEnd 0 ms
        //     connectStart 0 ms
        //     connectEnd 0 ms
        //     requestStart 1 ms
        //     responseStart 5 ms
        //     responseEnd 10 ms
        //     unloadEventStart 18 ms
        //     unloadEventEnd 19 ms
        //     domLoading 45 ms
        //     domInteractive 327 ms
        //     domContentLoadedEventStart 327 ms
        //     domContentLoadedEventEnd 328 ms
        //     domComplete 1181 ms
        //     loadEventStart 1181 ms
        //     loadEventEnd 1183 ms
    }, 20000);

});

