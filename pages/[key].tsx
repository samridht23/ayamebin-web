import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import hljs from "highlight.js";

const pages = () => {
  const [content, setContent] = useState("");
  const router = useRouter();
  const { key } = router.query;
  async function fetcher() {
    try {
      const response = await fetch(`/api/paste/?k=${key}`, { method: "GET" });
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
        <div>{key}</div>
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
