const puppeteer = require('puppeteer');
const gramophone = require('gramophone');
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


describe('Keyword Presence', async () => {
    let keywords = ['shoes', 'tie your shoes']

    test('keyword in title', async () => {

        await page.goto('https://www.wikihow.com/Tie-Your-Shoes');
        await page.waitForSelector('#article_shell');
        const pageTitle = await page.title();
        const metaDescription = await page.$eval("head > meta[name='description']", element => element.textContent);

        keywords.forEach(keyword => {
            expect(pageTitle.toLowerCase()).toMatch(keyword);
        });
    }, 20000);


    test('keyword in meta', async () => {

        await page.goto('https://www.wikihow.com/Tie-Your-Shoes');
        await page.waitForSelector('#article_shell');
        const metaDescription = await page.evaluate(() => document.querySelector('meta[name="description"]').content);
        keywords.forEach(keyword => {
            expect(metaDescription.toLowerCase()).toMatch(keyword);
        });

        // browser.close();

    }, 20000);

});

describe('most popular words', async () => {
    test('find common words', async () => {
        await page.goto('https://www.wikihow.com/Tie-Your-Shoes');
        await page.waitForSelector('#article_shell');
        let content = await page.$eval('*', el => el.innerText);
        var wordCounts = {};
        var words = content.split(/\b/);

        for (var i = 0; i < words.length; i++)
            wordCounts[words[i]] = (wordCounts[ words[i]] || 0) + 1;
        var sortable = [];
        for (var word in wordCounts) {
            sortable.push([word, wordCounts[word]]);
        }

        sortable.sort(function (a, b) {
            return b[1] - a[1];
        });
        console.log(sortable)
    })
    // [ [ ' ', 1823 ],
    //   [ 'the', 180 ],
    //   [ '\n', 90 ],
    //   [ 'to', 65 ],
    //   [ '. ', 63 ],
    //   [ 'a', 58 ],
    //   [ ', ', 56 ],
    //   [ 'and', 50 ],
    //   [ 'your', 48 ],
    //   [ 'of', 48 ],
    //   [ 'you', 45 ],
    //   [ 'knot', 27 ],
    //   [ 'other', 25 ],
    //   [ '\n\n', 23 ],
    //   [ 'should', 22 ],
    //   [ 'lace', 21 ],
    //   [ 'laces', 20 ],
    //   [ '.[', 20 ],
    //   [ 'Helpful', 20 ],
    //   [ 'it', 19 ],
    //   [ '.\n', 19 ],
    //   [ 'shoe', 19 ],
    //   [ 'loop', 18 ],
    //   [ 'shoes', 18 ],
    //   [ 'with', 18 ],
    //   [ 'them', 18 ],
    //   [ 'are', 17 ],
    //   [ 'wikiHow', 17 ],
    //   [ 'one', 16 ],
    //   [ 'or', 16 ],
    //   [ 'be', 16 ],
    //   [ 'How', 15 ],
    //   [ 'on', 15 ],
    //   [ ' “', 15 ],
    //   [ 'shoelace', 15 ],
})

describe('most popular words w/gramophone', async () => {
    test('find common words', async () => {
        await page.goto('https://www.wikihow.com/Tie-Your-Shoes');
        await page.waitForSelector('#article_shell');
        let content = await page.$eval('*', el => el.innerText);
        console.log(gramophone.extract(content))
    })
    // [ 'knot',
    // 'tie',
    // 'lace',
    // 'shoes',
    // 'helpful',
    // 'laces',
    // 'shoe',
    // 'loop',
    // 'shoelace',
    // 'make',
    // 'pull',
    // 'loops',
    // 'side',
    // 'circle',
    // 'tight',
    // 'fingers',
    // 'method',
    // 'wikihow contributor',
})
