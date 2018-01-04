const CDP = require('chrome-remote-interface');

function getElementsByXPath(xpath, parent)
{
  let results = [];
  let query = document.evaluate(xpath,
      parent || document,
      null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  for (let i=0, length=query.snapshotLength; i<length; ++i) {
    results.push(query.snapshotItem(i));
  }
  return results;
}

async function search_baidu() {
    try {
        // connect to endpoint
        var client = await CDP();
        // extract domains
        const {Network, Page} = client;
        // setup handlers
        Network.requestWillBeSent((params) => {
            var req_url = params.request.url;
            if (req_url.indexOf('m3u8') > -1) {
              console.log(params.request.url, params);
            }
        });
        // enable events then start!
        await Promise.all([Network.enable(), Page.enable()]);
        await Page.navigate({url: 'http://v.youku.com/v_show/id_XMzE3MTIwMjI2MA==.html?spm=a2h0j.8191423.vpofficiallistv5_wrap.5~5~5~5!21~A'});
        // await page.findElement(webdriver.By.id('kw')).sendKeys('chrome')
        // await page.findElement(webdriver.By.id('su')).submit();
        await Page.loadEventFired();
        // await client.Runtime.evaluate({
          // expression: `getElementsByXPath('//*[@id="ykPlayer"]/div[1]/div[2]/div[2]/div[2]/div[4]/div/div[4]').click();`
        // });
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
