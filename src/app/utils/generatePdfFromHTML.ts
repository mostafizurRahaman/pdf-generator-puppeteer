import puppeteer, { Browser, Page } from "puppeteer";
import AppError from "../errors/AppError";
import httpStatus from "http-status";
import path from "path";

let browser: Browser;
const browserQueue: Page[] = [];

//  ** Init Browser **
const initBrowser = async (maxCurrentJobs: number) => {
  // ** Lunch This Browser **

  browser = await puppeteer.launch({
    headless: "shell",
    args: [
      "--disable-features=IsolateOrigins",
      "--disable-site-isolation-trials",
      "--autoplay-policy=user-gesture-required",
      "--disable-background-networking",
      "--disable-background-timer-throttling",
      "--disable-backgrounding-occluded-windows",
      "--disable-breakpad",
      "--disable-client-side-phishing-detection",
      "--disable-component-update",
      "--disable-default-apps",
      "--disable-dev-shm-usage",
      "--disable-domain-reliability",
      "--disable-extensions",
      "--disable-features=AudioServiceOutOfProcess",
      "--disable-hang-monitor",
      "--disable-ipc-flooding-protection",
      "--disable-notifications",
      "--disable-offer-store-unmasked-wallet-cards",
      "--disable-popup-blocking",
      "--disable-print-preview",
      "--disable-prompt-on-repost",
      "--disable-renderer-backgrounding",
      "--disable-setuid-sandbox",
      "--disable-speech-api",
      "--disable-sync",
      "--hide-scrollbars",
      "--ignore-gpu-blacklist",
      "--metrics-recording-only",
      "--mute-audio",
      "--no-default-browser-check",
      "--no-first-run",
      "--no-pings",
      "--no-sandbox",
      "--no-zygote",
      "--password-store=basic",
      "--use-gl=swiftshader",
      "--use-mock-keychain",
    ],
    userDataDir: path.join(process.cwd() + "/temp"),
  });

  //  Initialize MaxCurrentJobs Queues **

  for (let i = 0; i < maxCurrentJobs; i++) {
    const page = await browser.newPage();

    browserQueue.push(page);
  }
};

const generatePdfFromHTML = async (html: string) => {
  // !  Check Any Page Exists Is Browser Queue:
  if (browserQueue.length === 0) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "No Available Browser Page For Paralization!!!",
    );
  }

  // * Pick One page **
  const page = browserQueue.pop();

  // *  Set Html Data **
  await page?.setContent(html, {
    waitUntil: "networkidle2",
  });

  // * Generate PDF BY Providing Options *

  const pdf = await page?.pdf({
    format: "A4",
    waitForFonts: true,
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: headerTemplate,
    footerTemplate: footerTemplate,
    margin: {
      top: 20,
      bottom: 20,
      left: 20,
      right: 20,
    },
  });

  browserQueue.push(page as Page);
  return pdf;
};

async function closeBrowser() {
  await browser.close();
}

const headerTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Simple Header Template</title>
    <style>
        body {
            margin: 0;
            font-family: Arial, sans-serif;
        }
        .header {
            background-color: #4CAF50;
            padding: 10px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: white;
        }
        .header .logo {
            font-size: 24px;
            font-weight: bold;
        }
        .header nav a {
            color: white;
            text-decoration: none;
            margin: 0 10px;
            font-size: 18px;
        }
        .header nav a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>

<div class="header">
    <div class="logo">MyLogo</div>
    <nav>
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#services">Services</a>
        <a href="#contact">Contact</a>
    </nav>
</div>

</body>
</html>
`;

const footerTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Simple Header Template</title>
    <style>
        .red{
          color: red;
          font-weight: 700;
          text-align: center;
        }
    </style>
</head>
<body>

<div>
    <p class="red">www.mrftechbd.com</p>
</div>

</body>
</html>`;

export { initBrowser, generatePdfFromHTML, closeBrowser };
