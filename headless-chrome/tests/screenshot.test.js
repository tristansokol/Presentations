const puppeteer = require('puppeteer');
PNG = require('pngjs').PNG;
pixelmatch = require('pixelmatch');
fs = require('fs')

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


describe('screenshot testing', async () => {
    test('take a screenshot', async () => {
        return new Promise(async (resolve, reject) => {
            await page.goto('https://www.wikihow.com/Tie-Your-Shoes');
            await page.waitForSelector('#article_shell');
            await page.screenshot({
                path: './local2.png',
                fullPage: false,
            })
            await page.goto('https://www.wikihow.com/Tie-Your-Shoes');
            await page.waitForSelector('#article_shell');
            await page.screenshot({
                path: './local.png',
                fullPage: false,
            })
            img1 = fs.createReadStream('./local2.png').pipe(new PNG()).on('parsed', doneReading).on('error', function () { reject() });
            img2 = fs.createReadStream('./local.png').pipe(new PNG()).on('parsed', doneReading).on('error', function () { reject() });
            filesRead = 0
            function doneReading() {
                if (++filesRead < 2) return;
                var diff = new PNG({ width: img1.width, height: img1.height });

                pixelmatch(img1.data, img2.data, diff.data, img1.width, img1.height, { threshold: 0.1 });

                diff.pack().pipe(fs.createWriteStream('diff.png'));
                resolve()
            }
        });
    }, 45000);


});
