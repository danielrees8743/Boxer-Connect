import AppError from '../utils/appError';
import { Request, Response, NextFunction } from 'express';

export const handleDBCastError = (err: AppError) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

export const duplicateDBFields = (err: AppError) => {
  const value = err.message.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

export const validationError = (err: AppError) => {
  const errors = Object.values(err.errors).map((el: any) => el.message);
  const message = `Error with selected input. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

export const webTokenError = (err: AppError) =>
  new AppError('Invalid token. Please log in again!', 401);

export const webTokenExpired = (err: AppError) =>
  new AppError('Your token has expired! Please log in again.', 401);

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
    res.status(err.statusCode).json({
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

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = Object.assign(err);
    if (error.name === 'CastError') error = handleDBCastError(error);
    if (error.code === 11000) error = duplicateDBFields(error);
    if (error.name === 'ValidationError') error = validationError(error);
    if (error.name === 'JsonWebTokenError') error = webTokenError(error);
    if (error.name === 'TokenExpiredError') error = webTokenExpired(error);

    sendErrorProd(error, res);
  }
};
