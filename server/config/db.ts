//info Connection to MongoDB Atlas
import mongoose from 'mongoose';
import config, { theme } from './config';
// import betterLogging from 'better-logging';

mongoose.set('strictQuery', true);
// betterLogging(console);

const dbConnectionString = `mongodb+srv://${config.db.userName}:${config.db.password}@${config.db.collection}.5pjfa.mongodb.net/Boxer-connect?retryWrites=true&w=majority`;

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(dbConnectionString);

    console.info(theme.info('MongoDB Connected...'));
  } catch (error: any) {
    console.log(theme.info(error));
    process.exit(1);
  }
};

export default connectDB;
