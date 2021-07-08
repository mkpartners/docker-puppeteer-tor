const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    bindAddress: "0.0.0.0",
    args: [
      "--headless",
      "--disable-gpu",
      "--no-sandbox",
      "--disable-dev-shm-usage",
      "--remote-debugging-port=9222",
      "--remote-debugging-address=0.0.0.0",
      "--proxy-server=http://127.0.0.1:8118"
    ]
  });
  const page = await browser.newPage().catch(e => {
    console.error(e);
  });
  page.setDefaultNavigationTimeout(60000);
  await page.goto("https://check.torproject.org/api/ip", {
    waitUntil: "networkidle2"
  }).catch(e => {
    console.error(e);
  });
  console.log( await page.content() );
  await page.pdf({
    path: "screenshot.pdf",
    printBackground: true
  }).catch(e =>{
    console.error(e);
  });

  await browser.close().catch(e => {
    console.error(e);
  });
})();