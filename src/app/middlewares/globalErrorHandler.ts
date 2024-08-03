import { ErrorRequestHandler } from "express";

import httpStatus from "http-status";
import configs from "../configs";
import { IErrSource } from "../interfaces/global";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const message: string = err.message || "Something Went Wrong!!!";
  const errMessage: string = "";
  const statusCode: number = httpStatus.INTERNAL_SERVER_ERROR;
  const errSource: IErrSource[] = [
    {
      path: "",
      message: "",
    },
  ];

  res.status(statusCode).json({
    success: false,
    message,
    errMessage,
    errSource,
    stack: configs.node_env !== "production" ? err.stack : null,
  });
};

export default globalErrorHandler;
