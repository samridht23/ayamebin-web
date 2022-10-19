import { NextApiRequest, NextApiResponse } from "next";
import cuid from "cuid";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({
      ok: false,
      message: "Method not allowed",
    });
  }
  try {
    const;
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: err,
    });
  }
};
