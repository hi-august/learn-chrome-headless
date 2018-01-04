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
  // return results;
  return results[0];
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
            if (req_url.indexOf('ListContent') > -1) {
              console.log(params.request.url, params);
            }
            // console.log(params.request.url, params);
        });
        // enable events then start!
        await Promise.all([Network.enable(), Page.enable()]);
        await Page.navigate({url:
          'http://wenshu.court.gov.cn/List/List?sorttype=1&conditions=searchWord+++2017-12-11%20TO%202017-12-12+%E4%B8%8A%E4%BC%A0%E6%97%A5%E6%9C%9F:2017-12-11%20TO%202017-12-12&conditions=searchWord+2+AJLX++%E6%A1%88%E4%BB%B6%E7%B1%BB%E5%9E%8B:%E5%88%91%E4%BA%8B%E6%A1%88%E4%BB%B6'
        });
        // await page.findElement(webdriver.By.id('kw')).sendKeys('chrome')
        // await page.findElement(webdriver.By.id('su')).submit();
        await Page.loadEventFired();
        // await client.Runtime.evaluate({
          // expression: `getElementsByXPath('//*[@id="ykPlayer"]/div[1]/div[2]/div[2]/div[2]/div[4]/div/div[4]').click();`
        // });
        const result = await client.Runtime.evaluate({
            // expression: 'document.title'
            expression: 'document.cookie'
            // expression: 'document.documentElement.outerHTML'
            // expression: 'document.getElementById("resultList")',
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
