import { NextRouter, useRouter } from "next/router";
import hljs from "highlight.js";
import { useEffect, useState } from "react";

const handler = () => {
  const router: NextRouter = useRouter();
  const key: string = router.asPath;
  const tt = key;
  const [content, setContent] = useState("");
  useEffect(() => {
    hljs.highlightAll();
    fetch("/api/paste" + tt, { method: "GET" })
      .then((res) => res.text())
      .then((data) => {
        setContent(data);
      });
  }, []);
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
export default handler;
