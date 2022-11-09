import { NextApiRequest, NextApiResponse } from "next";
import { getStream } from "@/libs/s3";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  } else if (req.method === "GET") {
    try {
      const content = await getStream();
      const data = await content?.Body?.transformToString();
      console.log(data);
      return res.status(200).send(data);
    } catch (err) {
      console.log(err);
    }
  }
};
