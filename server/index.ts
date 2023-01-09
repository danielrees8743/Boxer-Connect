import express from 'express';
import morgan from 'morgan';
import config, { theme } from './config/config';
import connectDB from './config/db';
import betterLogging from 'better-logging';
import cors from 'cors';

//info Mounting the routes
import boxerRouter from './routes/boxerRoutes';
import clubRouter from './routes/clubRoutes';
import userRouter from './routes/userRoutes';

const app = express();

//info Global Middleware
betterLogging(console);
app.use(cors());
app.use(express.json({ limit: '10kb' }));

console.log(
  theme.log(`${config.app.name} is running in ${process.env.NODE_ENV} mode`)
);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//info Routes
app.use('/api/boxers', boxerRouter);
app.use('/api/clubs', clubRouter);
app.use('/api/users', userRouter);

//info Server and Database connection
const port = config.app.port;
app.listen(port, () => {
  console.info(theme.info(`Server is running on http://localhost:${port}`));
  connectDB();
});
