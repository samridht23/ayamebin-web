import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";

// creating new instance of s3
const s3Client = new S3Client({
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
  },
});
export const upload = async (payload: string, key: string) => {
  try {
    const data = await s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.BUCKET,
        Key: key,
        Body: payload,
      })
    );
    console.log("uploaded");
    return data;
  } catch (err) {
    console.log(err);
  }
};
export const getStream = async (tt: any) => {
  try {
    const params = {
      Bucket: process.env.BUCKET,
      Key: tt,
    };
    const data = await s3Client.send(new GetObjectCommand(params));
    return data;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { upload, getStream };
