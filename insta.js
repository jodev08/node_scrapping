const puppeteer = require("puppeteer");
require("dotenv").config();

(async () => {
  //ouverture page (browser)
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://instagram.com");

  //cookie(click)
  await page.click("._1XyCr  > button");

  //login
  await page.type("[name=username]", process.env.INSTA_USER, { delay: 100 });
  await page.type("[name=password]", process.env.INSTA_PASS, { delay: 100 });
  await page.click("button[type=submit]");

  //await browser.close();
})();
