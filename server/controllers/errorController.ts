import AppError from '../utils/appError';
import { Request, Response, NextFunction } from 'express';

export const handleDBCastError = (err: AppError) => {
  console.log(err.path);
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

export const duplicateDBFields = (err: AppError) => {
  const value = err.message.match(/(["'])(\\?.)*?\1/)[0];
  console.log(value);
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

export const sendErrorDev = (err: AppError, res: any) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

export const sendErrorProd = (err: AppError, res: any) => {
  if (err.isOperational) {
    res.status(err.status).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error('ERROR 💥', err);
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    });
  }
};

export default (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  console.log({ err });

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = Object.assign(err);
    if (error.name === 'CastError') error = handleDBCastError(error);
    if (error.code === 11000) error = duplicateDBFields(error);

    sendErrorProd(error, res);
  }
};
