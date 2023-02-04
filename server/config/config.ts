//info General configuration file, all the configuration will be stored here

import dotenv from 'dotenv';
import colors from 'colors';
import { IConfig, ITheme } from '../types/Interfaces';

dotenv.config({ path: './config.env' });

export const config: IConfig = {
  app: {
    portProd: process.env.DEVELOPMENT_PORT || 4001,
    portDev: process.env.PRODUCTION_PORT || 8080,
    name: 'Boxer-Connect',
  },
  db: {
    collection: process.env.DB_COLLECTION,
    userName: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  },
  email: {
    host: process.env.EMAIL_HOST || 'smtp.mailtrap.io',
    port: process.env.EMAIL_PORT || 2525,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
    cookieExpiresIn: process.env.JWT_COOKIE_EXPIRES_IN,
  },
  firebase: {
    apiKey: process.env.FB_API,
    authDomain: process.env.FB_AUTH_DOMAIN,
    projectId: process.env.FB_PROJECT_ID,
    storageBucket: process.env.FB_STORAGE_BUCKET,
    messagingSenderId: process.env.FB_MESSAGING_SENDER_ID,
    appId: process.env.FB_APP_ID,
    measurementId: process.env.FB_MEASUREMENT_ID,
  },
  aws: {
    bucketName: process.env.AWS_BUCKET_NAME,
    region: process.env.AWS_BUCKET_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    endpoint: process.env.AWS_ARN,
  },
};

export const theme: ITheme = {
  info: colors.magenta.italic,
  error: colors.red.italic,
  success: colors.green.italic.dim,
  warning: colors.yellow.italic.dim,
  log: colors.cyan.italic,
};

export default config;
