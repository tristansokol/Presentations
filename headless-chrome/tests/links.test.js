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


describe('Links', async () => {


    test('Less than 150 links on a page', async () => {
        await page.goto('https://www.wikihow.com/Tie-Your-Shoes');
        await page.waitForSelector('#article_shell');

        const numLinks = await page.evaluate(function () {
            let links = document.querySelectorAll('a');
            return links.length
        });
        expect(numLinks).toBeLessThan(125);
    }, 20000);

    test('Nofollows', async () => {
        await page.goto('https://www.wikihow.com/Tie-Your-Shoes');
        await page.waitForSelector('#article_shell');

        const links = await page.evaluate(function () {
            let links = document.querySelectorAll('a');
            items = [];
            for (var value of links.values()) {
                items.push({
                    href: value.href,
                    rel: value.rel,
                })
            }
            return items
        });
        links.forEach(element => {
            if(element.href.indexOf('wikihow')==-1){
                expect(element.rel).toEqual('nofollow')
            }

        });
        console.log(links)
        // expect(numLinks).toBeLessThan(125);
    }, 20000);


});

