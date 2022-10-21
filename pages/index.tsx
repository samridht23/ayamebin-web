import type { NextPage } from "next";
import Editor from "../components/Editor";

const Home: NextPage = () => {
  return (
    <main className="w-full bg-[#0D1117]">
      {" "}
      <Editor />
    </main>
  );
};

export default Home;
