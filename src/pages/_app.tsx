import { Layout } from "@/components";
import "@/styles/globals.css";
import { ConfigProvider } from "antd";
import "antd/dist/reset.css";
import locale from "antd/locale/zh_CN";
import "dayjs/locale/zh-cn";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Spin = dynamic(() => import("antd/es/spin"), {
  ssr: false,
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const [load, setLoad] = useState(false);

  useEffect(() => {
    setLoad(true);
  }, []);

  return (
    <>
      {load ? (
        <ConfigProvider locale={locale}>
          {router.pathname === "/login" ? (
            <Component {...pageProps} />
          ) : (
            <Layout>
              <Component {...pageProps} />
            </Layout>
          )}
        </ConfigProvider>
      ) : (
        <Spin className="loading" tip="Loading..." size="large" />
      )}
    </>
  );
}
