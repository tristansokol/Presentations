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


describe('Structured Data', async () => {


    test('jsonLD', async () => {
        await page.goto('https://www.wikihow.com/Tie-Your-Shoes');
        await page.waitForSelector('#article_shell');

        const structuredData = await page.evaluate(function () {
            let jsonLD = document.querySelector('script[type="application/ld+json"]');
            return JSON.parse(jsonLD.innerHTML);
        });
        expect(structuredData).not.toBeUndefined();
        // expect(struturedData.author).toBeEqualTo(content.author)
    }, 20000);


});

