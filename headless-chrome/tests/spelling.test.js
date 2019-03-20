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


describe('Check Spelling', () => {
    test('zero mispelled words', async () => {
        await page.goto('https://www.wikihow.com/Tie-Your-Shoes');
        await page.waitForSelector('#article_shell');

        const textsJoined = await page.evaluate(
            () => [...document.querySelectorAll('p')].map(elem => elem.innerText).join('\n')
        );

        // SpellChecker.checkSpelling(textsJoined).forEach(element => {
        //     console.log(textsJoined.slice(element.start,element.end))
        // });
        expect(SpellChecker.checkSpelling(textsJoined)).toHaveLength(0);
        // console.log()
    }, 20000);
});
