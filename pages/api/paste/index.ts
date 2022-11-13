import { NextApiRequest, NextApiResponse } from "next";
import { upload, getStream } from "@/libs/s3";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const key = req.query.k;
    try {
      const content = await getStream(key);
      const data = await content?.Body?.transformToString();
      return res.status(200).send(data);
    } catch (err) {
      console.log(err);
    }
  }
  if (req.method === "POST") {
    const payload = req.body;
    const { slug } = req.query;
    const key = slug?.toString() ?? "";
    try {
      const content = await upload(payload, key);
      console.log(content);
      return res.status(200).json({ success: true });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "serer error" });
    }
  }
};
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "2mb",
    },
  },
};
