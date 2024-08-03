import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes";

// * Create a App **
const app = express();

//* Our Middlewares are here **
app.use(cors());
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
  }),
);

app.get("/", (req, res) => {
  res.json({
    message: "Yeah!!! Our server is Ready Now !!!🥳🚀",
  });
});

//  All Router are here **
app.use("/api/v1", router);

// ! Error Handler **
app.use(globalErrorHandler);

// ! Not Found **
app.use(notFound);

// ! Todo : Export our app **
export default app;
