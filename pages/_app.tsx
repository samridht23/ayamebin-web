import "../styles/globals.css";
import Head from "next/head";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { useRouter } from "next/router";

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Nextbin</title>
        <meta name="charset" content="utf-8" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta name="title" content="fastbin" />
        <meta
          name="description"
          content="free, fast, and easy pastebin service"
        />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default App;
