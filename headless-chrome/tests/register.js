const puppeteer = require('puppeteer');
(async () => {
    browser = await puppeteer.launch({
        headless: false,
        slowMo: 80,
    });
    console.log('Opening https://confoo.ca/en/yul2019');
    page = await browser.newPage();

    await page.goto('https://confoo.ca/en/yul2019');
    await page.waitForSelector('body > div > div.row.navigation > div > nav > div.collapse.navbar-collapse > span > a');

    console.log('Clicking the "buy tickets" button')
    await Promise.all([
        page.waitForNavigation({}),
        page.click('body > div > div.row.navigation > div > nav > div.collapse.navbar-collapse > span > a'),
    ]);

    await page.waitForSelector('body > div > div.row.page > div > div > div.col-md-9.content > div > form > div.cart-totals.row > div.submit.col-xs-12.col-sm-6 > button.btn.btn-primary');

    console.log('Login, etc.')
    await page.waitFor(10000);

    browser.close();
})();
