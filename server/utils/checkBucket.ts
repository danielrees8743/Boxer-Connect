import { S3 } from 'aws-sdk';

export const checkBucket = async (s3: S3, bucketName: string) => {
  try {
    const response = await s3.headBucket({ Bucket: bucketName }).promise();
    console.log('Bucket exists', response.$response.data);

    return { success: true, message: 'Bucket already Exist', data: {} };
  } catch (error) {
    console.log('Bucket does not exist', error);

    return { success: false, message: "Error bucket don't exist", data: error };
  }
};
