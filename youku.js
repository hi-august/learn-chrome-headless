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
        await Page.navigate({url:
          'http://v.youku.com/v_show/id_XMzE4Nzk4OTUwOA==.html?spm=a2h0j.8191423.vpofficiallistv5_wrap.5~5~5~5!49~A'
        });
        await Page.loadEventFired();
        // 切换清晰度
        await client.Runtime.evaluate({
          expression: `var xpath = '//*//div[@data-val="720p"]';
          document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click();`
        });
        // 获取source
        const result = await client.Runtime.evaluate({
            expression: 'window.H5player._manage._player.config.source'
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
