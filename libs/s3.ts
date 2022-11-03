import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

const REGION = process.env.REGION;

// creating new instance of s3
const s3Client = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
  },
});
export const upload = async (payload: string) => {
  const params = {
    Bucket: process.env.BUCKET,
    Key: `pastes/${uuidv4()}`,
    Body: payload,
  };
  try {
    const data = await s3Client.send(new PutObjectCommand(params));
    console.log("uploaded");
    return data;
  } catch (err) {
    console.log(err);
  }
};
export const getContent = async (key: string) => {
  try {
  } catch (err) {
    console.log(err);
  }
};

module.exports = { upload };
