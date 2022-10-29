import { NextApiRequest, NextApiResponse } from "next";
import cuid from "cuid";
import S3 from "aws-sdk/clients/s3";

const s3 = new S3({
  region: process.env.REGION,
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY,
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  const { content } = req.body;
  const key = cuid.slug();
  try {
    const params = {
      Bucket: process.env.BUCKET,
      key: key,
      Body: content,
      ContentType: "text/plain",
    };
    const url = await s3.getSignedUrlPromise("putObject", params);
    res.status(200).json({ url });
  } catch (err) {
    console.log(err), res.status(400).json({ message: err });
  }
};
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "5mb",
    },
  },
};
