const puppeteer = require('puppeteer');

beforeAll(async () => {
    browser = await puppeteer.launch({
        headless: true,
        slowMo: 80,
        //   args: [`--window-size=${width},${height}`]
    });
    page = await browser.newPage();
    // await page.setViewport({ width, height });
});
afterAll(() => {
    browser.close();
});


describe('images', async () => {
    test('alt tags for big images', async () => {
        await page.goto('https://www.wikihow.com/Tie-Your-Shoes');
        await page.waitForSelector('#article_shell');

        const extractedElements = await page.evaluate(function () {
            let x = document.querySelectorAll('img:not([alt])');
            const items = [];
            for (var value of x.values()) {

                items.push({
                    alt: value.alt,
                    src: value.src,
                    width: value.width,
                    height: value.height
                })
            }
            return items;
        });
        extractedElements.forEach(element => {
            expect(element.height).toBeLessThan(200);
            expect(element.width).toBeLessThan(200);
        });
    }, 20000);


    test('Served from CDN', async () => {

        page.on('response', async (response) => {
            const matches = /.*\.(jpg|png|svg|gif)$/.exec(response.url());
            if (matches && (matches.length === 2)) {
                expect(matches[0]).toMatch('cdn');
            }
        });

        await page.goto('https://www.wikihow.com/Tie-Your-Shoes');
        await page.waitForSelector('#article_shell');

    }, 20000);
    test('less than a megabyte', async () => {

        page.on('response', async (response) => {
            const matches = /.*\.(jpg|png|svg|gif)$/.exec(response.url());
            if (matches && (matches.length === 2)) {
                const buffer = await response.buffer();
                expect(buffer.byteLength).toBeLessThan(1000000);
            }
        });

        await page.goto('https://www.wikihow.com/Tie-Your-Shoes');
        await page.waitForSelector('#article_shell');

    }, 20000);


});
