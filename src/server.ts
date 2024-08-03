import { Server } from "http";
import app from "./app";
import configs from "./app/configs";
import { closeBrowser, initBrowser } from "./app/utils/generatePdfFromHTML";

const maxConcurrentJobs = 5;

let server: Server;
(async () => {
  await initBrowser(maxConcurrentJobs);
  server = app.listen(configs.port, () => {
    console.log(`Server Is Running Now!!!`);
  });
})();

//  ! Exit Server For Unhandled Rejection **
process.on("unhandledRejection", (reason, promise) => {
  console.log({
    reason,
    promise,
  });
  console.log(`UnHandled Rejection in Server!!! 😡`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

//! Exit Server Immediately For UnCaughtException :

process.on("uncaughtException", (err) => {
  console.log(err);
  console.log(`UnCaught Exception Happened! 🤯🤯🤯🤯`);

  process.exit(1);
});

async function handleExit(signal: any) {
  console.log("signal", signal);
  console.log(`${signal} received. Closing browser...`);
  try {
    await closeBrowser();
    console.log("Browser closed. Exiting process...");
    process.exit(0);
  } catch (err) {
    console.error("Error while closing browser:", err);
    process.exit(1);
  }
}

// Listen to SIGINT and SIGHUP in addition to SIGTERM
process.on("SIGTERM", handleExit);
process.on("SIGINT", handleExit);
process.on("SIGHUP", handleExit);
