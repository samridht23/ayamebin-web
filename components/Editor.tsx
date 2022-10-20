import { useEffect, useState } from "react";
import { FileTextIcon } from "@radix-ui/react-icons";
import hljs from "highlight.js";
import Link from "next/link";
const content = `import test from "test"
iiiiiiiiiiiiiiiimport test from "test"
mport test from "test"
mport test from "test"
mport test from iiiitest from "test"
mport test from "test"
mport test from "test"
mport test from "test"
mport test from "test"
mport test from "test"
mport test from "test"
mport test from "test"
mport test from "test"
mport test from "test"
mport test from "test"
mport test from "test"
mport test from "test"
mport test from "test"
mport test from "test"
mport test from "test"
mport test from "test"
mport test from "test"
mport test from "test"
mport test from "test"
mport test from "test"
mport test from "test"
mport test from "test"
mport test from "test"
mport test from "test"
mport test from "test"
mport test from "test"
mport test from "test"
mport test from "test"
mport test from "test"
mport test from "test"
mport test from "test"
mport test from "test"
mport test from "test"
mport test from "test"
mport test from "test"
mport test from "test"
mport test from "test"
mport test from "test"
mport test from "test"
mport test from "test"
mport test from "test"
mport test from "test"
mport test from "test"
mport test from "test"
mport test from "test"
mport test from "test"
mport test from "test"
mport test from "test"
mport test from "test"
mport test from "test"
mport test from "test"
mport test from "test"
mport test from "test"
mport test from "test"
mport test from "test"
mport test from "test"
mport test from "test"
mport test from "test"
mport test from "test"
mport test from "test"
mport test from "test"
mport test from "test"
mport test from "test"
mport test from "test"
mport test from "test"
mport test from "test"`;

const Editor = () => {
  const [editorState, setEditorState] = useState(false);
  useEffect(() => {
    hljs.highlightAll();
  });
  return (
    <>
      <div className="w-full h-screen flex justify-center py-[8rem] px-2 xl:px-[24rem] ">
        <div className=" w-full">
          <div className="w-full bg-[#161B22] border border-[#525A67] flex justify-between text-white border rounded-t-lg  items-center px-4 py-2">
            <div className="text-[#959CA4]">
              <FileTextIcon />
            </div>
            <div className="border border-[#959CA4] rounded text-[#959CA4]  text-sm px-1 leading-5 cursor-pointer">
              <Link href="/">Raw</Link>
            </div>
          </div>
          <div className="border-x border-b border-[#525A67]">
            {editorState ? (
              <div className="overflow-auto text-xs p-2">
                <pre>
                  <code style={{ padding: "0px" }}>{content}</code>
                </pre>
              </div>
            ) : (
              <textarea
                className="w-full h-[24rem] sm:h-[34rem] rounded-b-lg resize-none  text-xs text-gray-300 whitespace-nowrap outline-none p-2 bg-[#0D1117]"
                placeholder="Enter your text here"
              ></textarea>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Editor;
