const puppeteer = require("puppeteer");
const nodemailer = require("nodemailer");
require("dotenv").config();

(async () => {
  //ouverture page (browser)
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(
    "https://sport-nutrition.be/fr/shop/product/bcaa-xpress-7032?category=2017#attr=12240,12234"
  );

  await page.setViewport({
    width: 1200,
    height: 1000,
  });

  //----------------pdf via url--------------------------
  /*
  await page.pdf({
    path: "page.pdf",
    format: "A4",
  });
  */

  //-----------------image screen--------------------------
  /*
  await page.screenshot({
    path: "image.png",
  });
  */

  //--------------get body---------------------
  /*
  let bodyHTML = await page.evaluate(() => document.body.innerHTML);
  console.log(bodyHTML);
  */

  //--------------aller chercher un element d'une page web

  let data = await page.evaluate(() => {
    //return document.querySelector("span[itemprop=price]").innerText;
    return document.querySelector("div[itemprop=offers]").innerText;
  });
  console.log("le prix est de :" + data);
  let newData = await data.substring(0, 4);

  if (parseInt(newData) < 22) {
    sendNotification(newData);
  }

  async function sendNotification(price) {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        // aller dans les paramètre gmail :https://www.youtube.com/watch?v=xvX4gWRWIVY
        user: process.env.USER_PASS,
        pass: process.env.MAIL_PASS,
      },
    });

    let info = await transporter
      .sendMail({
        from: "sportnutition",
        to: process.env.MAIL_TO,
        subject: "prix sous les" + price + "euro",
        html: "le prix est sous" + price + "euro",
      })
      .then(() => console.log("message envoyé"));
  }

  await browser.close();
})();
