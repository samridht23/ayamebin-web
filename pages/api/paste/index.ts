import { NextApiRequest, NextApiResponse } from "next";
import { upload } from "@/libs/s3";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    return res.status(405).json({ message: "Method on allowed" });
  }
  if (req.method === "POST") {
    const payload = req.body;
    try {
      const content = await upload(payload);
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
