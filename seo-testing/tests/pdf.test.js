SpellChecker = require('spellchecker');
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


describe('screenshot testing', async () => {
    test('take a screenshot', async () => {
        await page.goto('https://www.wikihow.com/Tie-Your-Shoes');
        await page.waitForSelector('#article_shell');
        // page.emulateMedia('screen')
        await page.pdf({
            path:'./report.pdf',
            printBackground:true
        })

    }, 20000);
});
