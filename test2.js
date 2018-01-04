const puppeteer = require('puppeteer');
(async() => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto("https://www.baidu.com/", { waitUntil: "networkidle2" });
  // await page.click("a.storylink");
  console.log(await page.title());
  console.log(await page.url());
  // console.log(await page.content());
  console.log(await page.$eval('input[type=submit]', el => el.value));
  console.log(await page.$eval('#su', el => el.value));
  browser.close();
})();
