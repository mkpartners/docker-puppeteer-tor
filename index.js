const puppeteer = require("puppeteer");

const PROCESS_ARGS = process.argv.slice(2);
const IS_LOCAL = PROCESS_ARGS.length > 0 && PROCESS_ARGS[0] === "local";

(async () => {
  const args = [
    "--headless",
    "--disable-gpu",
    "--no-sandbox",
    "--disable-dev-shm-usage",
    "--remote-debugging-port=9222",
    "--remote-debugging-address=0.0.0.0",
  ];
  if (!IS_LOCAL) {
    args.push("--proxy-server=http://127.0.0.1:8118");
  }
  const browser = await puppeteer.launch({
    bindAddress: "0.0.0.0",
    args: args,
  });
  const page = await browser.newPage().catch((e) => {
    console.error(e);
  });
  page.setDefaultNavigationTimeout(60000);
  await page
    .goto("https://check.torproject.org/api/ip", {
      waitUntil: "networkidle2",
    })
    .catch((e) => {
      console.error(e);
    });
  console.log(await page.content());
  await page
    .pdf({
      path: "screenshot.pdf",
      printBackground: true,
    })
    .catch((e) => {
      console.error(e);
    });

  await browser.close().catch((e) => {
    console.error(e);
  });
})();
