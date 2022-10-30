import { NextApiRequest, NextApiResponse } from "next";
import { upload } from "../../../libs/s3";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    return res.status(405).json({ message: "code to be coded" });
  }
  if (req.method === "POST") {
    const payload = req.body;
    try {
      const content = upload(payload);
      console.log(content);
      return res.status(200).json({ message: "code has been uploaded" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "serer error" });
    }
  }
};
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "5mb",
    },
  },
};
