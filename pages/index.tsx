import type { NextPage } from "next";
import Editor from "../components/Editor";

const Home: NextPage = () => {
  return (
    <div>
      <main className="w-full h-screen bg-[#0D1117]">
        {" "}
        <Editor />
      </main>
    </div>
  );
};

export default Home;
