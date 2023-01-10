import { Response } from 'express';

export const sendResponse = (
  res: Response,
  status: number,
  data: any
): Response => {
  return res.status(status).json({
    status: 'success',
    data,
  });
};

export const sendNotFound = (
  res: Response,
  status: number,
  message: string
) => {
  return res.status(status).json({
    status: 'fail',
    message,
  });
};

export const sendError = (
  res: Response,
  status: number,
  error: unknown
): [number, Object] => {
  return [
    status,
    res.status(status).json({
      status: 'fail',
      error,
    }),
  ];
};

export default {
  sendResponse,
  sendNotFound,
  sendError,
};
