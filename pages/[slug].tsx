import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import hljs from "highlight.js";

const pages = () => {
  const [content, setContent] = useState("");
  const [hash, setHash] = useState("");
  const router = useRouter();
  const { slug } = router.query;
  useEffect(() => {
    const { hash } = window.location;
    setHash(hash);
  });
  const objectKey = hash.slice("#key=".length);
  // all the s3 error in console is from the react feature of double render
  // of dom so first 2 api call will be undefied as now key is mounted
  // so dont worry about the error as this only happen in development mode and
  // will be gone in production

  // the body tha is going out is due to hsjs not being used

  async function fetcher() {
    // write fetch function inside useEffect
    try {
      console.log("ObjectKey " + objectKey);
      const key = await crypto.subtle.importKey(
        "jwk",
        {
          k: objectKey,
          alg: "A128GCM",
          ext: true,
          key_ops: ["encrypt", "decrypt"],
          kty: "oct",
        },
        { name: "AES-GCM", length: 128 },
        false, // extractable
        ["decrypt"]
      );
      const response = await fetch(`/api/paste/?k=${slug}`, { method: "GET" });
      console.log("key " + key);
      //const data = await response.text();
      // error might be in data provided
      const encrypted = await response.arrayBuffer();
      console.dir("arrayBuffer " + JSON.stringify(encrypted));
      const decrypted = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv: new Uint8Array(12) },
        key,
        encrypted
      );
      //const decoded = new TextDecoder().decode(new Uint8Array(decrypted));
      //console.log("decoded " + decoded);
      //setContent(decoded);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <div className="px-4 py-12 md:px-12 xl:px-[350px]">
        <div>{slug}</div>
        <div>{hash}</div>
        <div className="border rounded">
          <pre>
            <code style={{ padding: "0px" }}>{content}</code>
          </pre>
        </div>
      </div>
    </>
  );
};
export default pages;
