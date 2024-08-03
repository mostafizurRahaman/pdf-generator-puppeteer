import { Response } from "express";

interface IMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface IResponseData<T> {
  success: boolean;
  message: string;
  statusCode: number;
  meta?: IMeta;

  data: T;
}

const sendResponse = <T>(res: Response, data: IResponseData<T>) => {
  res.status(data?.statusCode).json({
    success: data?.success,
    message: data?.message,
    data: data?.data,
    meta: data?.meta,
  });
};

export default sendResponse;
