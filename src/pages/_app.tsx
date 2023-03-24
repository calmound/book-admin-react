import { Layout } from "@/components/Layout";
import "@/styles/globals.css";
import "antd/dist/reset.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
