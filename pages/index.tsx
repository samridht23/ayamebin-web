import type { NextPage } from "next";
import Editor from "../components/Editor";

const Home: NextPage = () => {
  return (
    <div className="bg-[#0D1117]">
      <main className="">
        <Editor />
      </main>
    </div>
  );
};

export default Home;
