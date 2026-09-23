const puppeteer = require("puppeteer");
const path = require("path");

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    args: ["--no-sandbox", "--disable-gpu", "--no-first-run"]
  });
  const page = await browser.newPage();
  const errors = [];
  page.on("console", (m) => { if (m.type() === "error") errors.push("console: " + m.text()); });
  page.on("pageerror", (e) => errors.push("pageerror: " + e.message));
  await page.goto("file:///" + path.join(__dirname, "dist", "index.html").replace(/\\/g, "/"), { waitUntil: "networkidle0" });

  // Клик по логотипу (href="#") — проверка обработчика якорей
  await page.click("a.logo");
  await new Promise((r) => setTimeout(r, 300));

  // Открытие мобильного меню
  await page.setViewport({ width: 390, height: 844 });
  await page.click(".nav-toggle");
  await new Promise((r) => setTimeout(r, 300));
  await page.click(".nav-toggle");

  // Отправка формы
  await page.type("#contact-form input[type=text]", "Test");
  await page.type("#contact-form input[type=email]", "test@test.ru");
  await page.type("#contact-form textarea", "Test message");
  await page.click("#contact-form button[type=submit]");
  await new Promise((r) => setTimeout(r, 1500));

  console.log(errors.length ? errors.join("\n") : "NO ERRORS");
  await browser.close();
})();