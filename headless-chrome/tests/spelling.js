SpellChecker = require('spellchecker');
const puppeteer = require('puppeteer');
(async () => {
    browser = await puppeteer.launch({
        headless: true,
        slowMo: 80,
    });
    page = await browser.newPage();

    await page.goto('https://www.wikihow.com/Tie-Your-Shoes');
    await page.waitForSelector('#article_shell');

    const textsJoined = await page.evaluate(
        () => [...document.querySelectorAll('p')].map(elem => elem.innerText).join('\n')
    );

    SpellChecker.checkSpelling(textsJoined).forEach(element => {
        console.log(textsJoined.slice(element.start,element.end))
    });
    // console.log();

    browser.close();
})();
