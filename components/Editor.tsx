import { useEffect } from "react";
import { FileTextIcon } from "@radix-ui/react-icons";
import hljs from "highlight.js";
import Link from "next/link";
// import styles for highlight
const content = `import test from "test"`;
const Editor = () => {
  useEffect(() => {
    hljs.highlightAll();
  });
  return (
    <>
      <div className="w-full flex text-sm justify-center py-12 px-12 lg:px-[24rem] ">
        <div className=" w-full h-screen ">
          <div className="w-full bg-[#161B22] border border-[#525A67] flex justify-between text-white border rounded-t-lg  items-center px-4 py-2">
            <div className="text-[#959CA4]">
              <FileTextIcon />
            </div>
            <div className="border border-[#959CA4] rounded text-[#959CA4]  text-sm px-1 leading-5 cursor-pointer">
              <Link href="/">Raw</Link>
            </div>
          </div>
          <div className="border-x border-b h-96 rounded-b-lg border-[#525A67]">
            <pre>
              <code>{content}</code>
            </pre>
          </div>
        </div>
      </div>
    </>
  );
};
export default Editor;
