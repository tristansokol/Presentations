const puppeteer = require('puppeteer');

beforeAll(async () => {
    browser = await puppeteer.launch({
        headless: false,
        slowMo: 80,
        //   args: [`--window-size=${width},${height}`]
    });
    page = await browser.newPage();
    // await page.setViewport({ width, height });
});
afterAll(() => {
    // browser.close();
});


describe('screenshot testing', async () => {
    test('take a screenshot', async done => {
        page.on('pageerror', (err) => {
            console.log(err);
            done.fail(new Error(err))
        })
        await page.goto('https://www.wikihow.com/Tie-Your-Shoes');
        await page.waitForSelector('#article_shell');

        done()
    }, 20000);
});
