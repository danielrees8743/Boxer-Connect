import fs from 'fs';
import S3 from 'aws-sdk/clients/s3';
import AppError from '../utils/appError';

//* Creates connection to AWS sever
const s3 = new S3({
  region: process.env.AWS_BUCKET_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

//* Uploads a image to S3 bucket
export const uploadFile = async (file: Express.Multer.File) => {
  console.log('useStorage', file);
  try {
    const fileStream = fs.createReadStream(file.path);

    const uploadParams = {
      Bucket: process.env.AWS_BUCKET_NAME as string,
      Body: fileStream,
      Key: file.filename,
    };

    return await s3.upload(uploadParams).promise();
  } catch (error) {
    console.log('error', error);
    return new AppError('Error uploading file', 500);
  }
};

//* Download the image from S3 bucket
export const getFileStream = async (fileKey: string) => {
  console.log('getFileStream', fileKey);
  try {
    const downloadParams = {
      Key: fileKey,
      Bucket: process.env.AWS_BUCKET_NAME as string,
    };

    return s3.getObject(downloadParams).createReadStream();
  } catch (error) {
    console.log('error', error);
    return new AppError('Error downloading file', 500);
  }
};

export default { uploadFile, getFileStream };
