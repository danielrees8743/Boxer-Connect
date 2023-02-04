import fs from 'fs';
import S3 from 'aws-sdk/clients/s3';
import util from 'util';

const unlinkFile = util.promisify(fs.unlink);

const s3 = new S3({
  region: process.env.AWS_BUCKET_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

//* Uploads a image to S3 bucket
export async function uploadFile(file: Express.Multer.File) {
  console.log('useStorage', file);
  const fileStream = fs.createReadStream(file.path);

  //* Removes the upload file from the upload folder
  await unlinkFile(file.path);

  const uploadParams = {
    Bucket: process.env.AWS_BUCKET_NAME as string,
    Body: fileStream,
    Key: file.filename,
  };

  return await s3.upload(uploadParams).promise();
}

//* Download the image from S3 bucket
export async function getFileStream(fileKey: string) {
  const downloadParams = {
    Key: fileKey,
    Bucket: process.env.AWS_BUCKET_NAME as string,
  };

  return s3.getObject(downloadParams).createReadStream();
}

export default { uploadFile, getFileStream };
