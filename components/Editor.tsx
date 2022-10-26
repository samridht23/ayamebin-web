import { useState } from "react";
const Editor = () => {
  const [content, setContent] = useState("");
  return (
    <div className="px-4 md:px-12 xl:px-64 py-12">
      <form>
        <div className="mb-4 w-full bg-gray-50 rounded-lg border border-[#d6d6d6] ">
          <div className="py-2 px-4 bg-gray-50 rounded-t-lg ">
            <textarea
              id="text"
              value={content}
              rows={15}
              onChange={(e) => setContent(e.target.value)}
              className="px-0 outline-none w-full resize-none whitespace-pre text-sm text-gray-900 bg-gray-50 border-0 focus:ring-0  "
              placeholder="Enter text here"
              spellCheck={false}
              required
            ></textarea>
          </div>
          <div className="flex justify-between items-center py-2 px-3 border-t ">
            <button
              type="submit"
              className="inline-flex  items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-[#24292F] hover:bg-[#24292F]/90  rounded-lg focus:ring-4 "
            >
              Create Paste
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Editor;
