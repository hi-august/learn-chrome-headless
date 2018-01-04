const puppeteer = require('puppeteer');
(async() => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto('http://wenshu.court.gov.cn/List/List?sorttype=1&conditions=searchWord+++2017-12-11%20TO%202017-12-12+%E4%B8%8A%E4%BC%A0%E6%97%A5%E6%9C%9F:2017-12-11%20TO%202017-12-12&conditions=searchWord+2+AJLX++%E6%A1%88%E4%BB%B6%E7%B1%BB%E5%9E%8B:%E5%88%91%E4%BA%8B%E6%A1%88%E4%BB%B6',
    { waitUntil: "networkidle2" });
  await page.screenshot({path: 'example.png'});
  console.log(await await page.$eval('#resultList', el => el.value));
  debugger;
  browser.close();
})();
