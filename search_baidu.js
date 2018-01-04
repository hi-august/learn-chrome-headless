const CDP = require('chrome-remote-interface');

async function search_baidu() {
    try {
        // connect to endpoint
        var client = await CDP();
        // extract domains
        const {Network, Page} = client;
        // setup handlers
        Network.requestWillBeSent((params) => {
            console.log(params.request.url);
        });
        // enable events then start!
        await Promise.all([Network.enable(), Page.enable()]);
        await Page.navigate({url: 'https://www.baidu.com/'});
        // await page.findElement(webdriver.By.id('kw')).sendKeys('chrome')
        // await page.findElement(webdriver.By.id('su')).submit();
        await Page.loadEventFired();
        await client.Runtime.evaluate({
          expression: `document.querySelector('#kw').value = 'python';
                       document.querySelector('#su').click();`
        });
        const result = await client.Runtime.evaluate({
            expression: 'document.title'
            // expression: 'document.cookie'
            // expression: 'document.documentElement.outerHTML'
        });
        const html = result.result.value;
        console.log(html);
    } catch (err) {
        console.error(err);
    } finally {
        if (client) {
            await client.close();
        }
    }
}

search_baidu();
