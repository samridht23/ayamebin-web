import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import cuid from "cuid";

const REGION = process.env.REGION;

const s3Client = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
  },
});
export const upload = async (content: string) => {
  const params = {
    Bucket: process.env.BUCKET,
    Key: `pastes/${cuid.slug()}`,
    Body: content,
  };
  try {
    const data = await s3Client.send(new PutObjectCommand(params));
    console.log("uploaded");
    return data;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { upload };
