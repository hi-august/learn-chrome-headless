const CDP = require("chrome-remote-interface");

CDP(client => {
  // extract domains
  const { Network, Page } = client;
  // setup handlers
  Network.requestWillBeSent(params => {
    var req_url = params.request.url;
    if (req_url.indexOf('m3u8') > -1) {
      console.log(params.request.url, params);
    }
    // console.log(params.request.url);
  });
  Page.loadEventFired(() => {
    client.close();
  });
  // enable events then start!
  Promise.all([Network.enable(), Page.enable()])
    .then(() => {
      return Page.navigate({ url: "http://v.youku.com/v_show/id_XMzE3MTIwMjI2MA==.html?spm=a2h0j.8191423.vpofficiallistv5_wrap.5~5~5~5!21~A" });
    })
    .catch(err => {
      console.error(err);
      client.close();
    });
}).on("error", err => {
  // cannot connect to the remote endpoint
  console.error(err);
});
