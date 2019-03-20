SpellChecker = require('spellchecker');
const puppeteer = require('puppeteer');
(async () => {
    browser = await puppeteer.launch({});
    page = await browser.newPage();

    await page.goto('https://google.com/');

    page.emulateMedia('screen')
    await page.pdf({ path:'./report.pdf', printBackground:true })

    browser.close();
})();
