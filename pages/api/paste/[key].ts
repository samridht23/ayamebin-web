import { NextApiRequest, NextApiResponse } from "next";
import { getStream } from "@/libs/s3";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { key } = req.query;
  if (req.method === "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  } else if (req.method === "GET") {
    try {
      console.log(key);
      const content = await getStream("dfdsf");
      const data = await content?.Body?.transformToString();
      return res.status(200).send(data);
    } catch (err) {
      console.log(err);
    }
  }
};
