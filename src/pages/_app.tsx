import { Layout } from "@/components/Layout";
import "@/styles/globals.css";
import "antd/dist/reset.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  console.log(
    "%c [ router ]-9",
    "font-size:13px; background:pink; color:#bf2c9f;",
    router
  );

  return router.pathname === "/login" ? (
    <Component {...pageProps} />
  ) : (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
