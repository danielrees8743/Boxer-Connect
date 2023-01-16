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
};

export const theme: ITheme = {
  info: colors.magenta.italic,
  error: colors.red.italic,
  success: colors.green.italic.dim,
  warning: colors.yellow.italic.dim,
  log: colors.cyan.italic,
};

export default config;
