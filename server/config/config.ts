//info General configuration file, all the configuration will be stored here

import dotenv from 'dotenv';
import colors from 'colors';
import { IConfig, ITheme } from '../types/Interfaces';

dotenv.config({ path: './config.env' });

export const config: IConfig = {
  app: {
    port: process.env.PORT || 8080,
    name: 'boxer-connect',
  },
  db: {
    collection: process.env.DB_COLLECTION,
    userName: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
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
