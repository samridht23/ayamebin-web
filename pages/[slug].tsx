import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import hljs from "highlight.js";

const pages = () => {
  const [content, setContent] = useState("");
  const router = useRouter();
  const { slug } = router.query;
  const path = router.asPath;
  console.dir(path);
  // all the s3 error in console is from the react feature of double render
  // of dom so first 2 api call will be undefied as now key is mounted
  // so dont worry about the error as this only happen in development mode and
  // will be gone in production
  async function fetcher() {
    try {
      const response = await fetch(`/api/paste/?k=${slug}`, { method: "GET" });
      const data = await response.text();
      setContent(data);
    } catch (err) {
      console.log(err);
    }
  }
  fetcher();
  return (
    <>
      <div className="px-4 py-12 md:px-12 xl:px-[350px]">
        <div>{path}</div>
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
