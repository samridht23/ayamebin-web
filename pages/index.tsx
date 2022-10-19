import type { NextPage } from "next";
import Editor from "../components/Editor";

const Home: NextPage = () => {
  return (
    <div>
      <main className="bg-[#0D1117] h-screen">
        {" "}
        <Editor />
      </main>
    </div>
  );
};

export default Home;
