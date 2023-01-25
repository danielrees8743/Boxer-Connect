import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import config, { theme } from './config/config';
import connectDB from './config/db';
import mongoSanitize from 'express-mongo-sanitize';

import AppError from './utils/appError';
import globalErrorHandler from './controllers/errorController';
// import betterLogging from 'better-logging';
import cors from 'cors';
import cookieParser from 'cookie-parser';

//info Mounting the routes
import boxerRouter from './routes/boxerRoutes';
import clubRouter from './routes/clubRoutes';
import userRouter from './routes/userRoutes';

const app = express();

//? Global Middleware
//info Security HTTP headers
app.use(require('helmet')());
// betterLogging(console);
app.use(
  cors({
    origin: ['http://127.0.0.1:5173', 'http://localhost:5173'],
    credentials: true,
  })
);

//info Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

//info Cookie parser
app.use(cookieParser());

//info Data sanitization against NoSQL query injection
app.use(mongoSanitize());

//info Data sanitization against XSS
app.use(require('xss-clean')());

//info Prevent parameter pollution - duplicate query parameters
//note empty now, will add fields later when filtering is implemented!!
app.use(require('hpp')({ whitelist: ['weight', 'height', 'age', 'fights'] }));

//info Rate limiting - limiting the amount of requests from the same IP
const limiter = require('express-rate-limit')({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message:
    'There have been too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

console.log(
  theme.log(`${config.app.name} is running in ${process.env.NODE_ENV} mode`)
);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//info Testing middleware
//note Middleware for testing purposes if needed
app.use((req: Request, res: Response, next: NextFunction) => {
  // console.log(req.headers);
  console.log('Cookie Parser', req.cookies);
  next();
});

//info Routes
app.use('/api/boxers', boxerRouter);
app.use('/api/clubs', clubRouter);
app.use('/api/users', userRouter);

//info Error handling for undefined routes
app.all('*', (req: Request, res: Response, next: NextFunction) => {
  return next(
    new AppError(`Can't find ${req.originalUrl} on this server!`, 404)
  );
});

//info Global error handling middleware
app.use(globalErrorHandler);

//info Server and Database connection
const port =
  process.env.NODE_ENV === 'development'
    ? //info Production port
      config.app.portProd
    : //info Development port
      config.app.portDev;
app.listen(port, () => {
  console.info(theme.info(`Server is running on http://127.0.0.1:${port}`));
  connectDB();
});

