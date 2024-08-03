import { RequestHandler } from "express";
import httpStatus from "http-status";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const notFound: RequestHandler = (req, res, next) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "You are in Wrong Route!!!",
  });
};

export default notFound;
