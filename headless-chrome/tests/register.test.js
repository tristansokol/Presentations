const puppeteer = require('puppeteer');

beforeAll(async () => {
    browser = await puppeteer.launch({
        headless: false,
        slowMo: 500,
        //   args: [`--window-size=${width},${height}`]
    });
    page = await browser.newPage();
    // await page.setViewport({ width, height });
},10000);
afterAll(() => {
     browser.close();
});


describe('webpage interaction', async () => {
    test('registration', async () => {
        await page.goto('http://midwestjs.com/#/main');
        await page.waitForSelector('#tickets');
        await page.hover('#tickets > div.container > div > div > div > h2:nth-child(5) > button > i')
        await page.waitFor(2000);
        await page.click('#tickets > div.container > div > div > div > h2:nth-child(5) > button > i', {
            button: 'left',
            delay: 200
        })
        await Promise.all([
            page.waitForNavigation({}),
            page.click('#tito-tickets-form > div.tito-submit-wrapper > button'),
        ]);
        await page.waitForSelector('#tito-iframe');
        console.log(page.frames());
        const frame = await page.frames().find(f => f.name() === 'tito-iframe');
        await (await frame.$('#registration_name')).type('Taylor', { delay: 100 });
        await (await frame.$('#registration_name')).type(' Swift', {});
        await (await frame.$('#registration_email')).type('taytay@gmail.com')
    }, 45000);
});
