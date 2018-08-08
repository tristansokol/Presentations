SpellChecker = require('spellchecker');
const puppeteer = require('puppeteer');
(async () => {
    browser = await puppeteer.launch({
        headless: true,
        slowMo: 80,
    });
    console.log('Opening http://midwestjs.com/#/main');
    page = await browser.newPage();

    await page.goto('http://midwestjs.com/#/main');
    await page.waitForSelector('#tickets');

    console.log('scrolling to the registration button')
    await page.hover('#tickets > div.container > div > div > div > h2:nth-child(5) > button > i')
    await page.waitFor(2000);
    await page.click('#tickets > div.container > div > div > div > h2:nth-child(5) > button > i', {
        button: 'left',
        delay: 200
    })
    await page.waitForSelector('#tito-tickets-form > div.tito-submit-wrapper > button');
    await Promise.all([
        page.waitForNavigation({}),
        page.click('#tito-tickets-form > div.tito-submit-wrapper > button'),
    ]);
    // await page.waitForSelector('#tito-iframe');
    console.log('Filling out ticket')
    await page.waitFor(1000);


    const frame = await page.frames().find(f => f.name() === 'tito-iframe');
    if (frame){
        await (await frame.$('#registration_name')).type('Taylor', { delay: 100 });
        await (await frame.$('#registration_name')).type(' Swift', {});
        await (await frame.$('#registration_email')).type('taytay@gmail.com')
    }else{
    await page.type('#registration_name','Taylor',{ delay: 100 });
    await page.type('#registration_name','Swift');
    await page.type('#registration_email','taytay@gmail.com',{});

    }


    browser.close();
})();
