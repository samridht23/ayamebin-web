import { NextApiRequest, NextApiResponse } from "next";

import cuid from "cuid";
import { encrypt } from "@/lib/secret";

// getting storage stratgey
const storage = getStorageStrategy();

// exporting config containing payload size
export const config = {
  api: {
    bodyParse: {
      sizeLimit: env("limits.max-payload-size") || "10mb",
    },
  },
};
// main function
export default async (req: NextApiRequest, res: NextApiResponse) => {
  // checking req method to not be POST
  if (req.method !== "POST") {
    return res.status(405).json({
      ok: false,
      error: "Method not allowed",
    });
  }
  // checking type of req.body to be string and if true then return req.body else req.body and body keys
  const contents =
    typeof req.body === "string"
      ? req.body
      : // request body and req.body first key
        req.body && Object.keys(req.body)[0];

  // if not content or not content.length then return error
  if (!contents || !contents.length) {
    return res.status(422).json({
      ok: false,
      error: "Contents is too short",
    });
  }
  // requiring max lenght from env file parsing radix method
  const maxLength = parseInt(env("limits.max-body-length"), 10);

  // if contents length more than maxLength then send error status
  if (contents.length > maxLength) {
    return res.status(422).json({
      ok: false,
      error: "Your snippet needs to be less than ${maxLength} character long",
    });
  }
  // main code of function
  try {
    // key var of type string or null
    let key: string | null = null;

    do {
      // get cuid slug
      key = cuid.slug();
    } while (await storage.exists(key));

    await storage.create({ key, contents });
    const secret = encrypt("id", key);
    return res.json({ ok: true, key, secret });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ ok: false });
  }
};
