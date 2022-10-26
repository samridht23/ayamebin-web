import AWS from "aws-sdk";
import fs from "fs";
import cuid from "cuid";

AWS.config.update({ region: "ap-south-1" });
const file = fs.readFileSync("../../../awstestdata/test1");

const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY,
});

const params = {
  Bucket: process.env.BUCKET,
  Key: cuid.slug(),
  Body: file,
};
s3.upload(params, (err, data) => {
  if (err) {
    Promise.reject(err);
  }
  Promise.resolve(data.Location);
});
