import { NextFunction, Request, RequestHandler, Response } from "express";

//  ** Create a Catch Async Function

const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};

export default catchAsync;
