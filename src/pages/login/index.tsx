import { UserLoginType } from "@/types";
import request from "@/utils/request";
import { Button, Form, Input, message } from "antd";
import classnames from "classnames";
import Head from "next/head";
import { useRouter } from "next/router";

import styles from "./index.module.css";

export default function Login() {
  const router = useRouter();
  const onFinish = async (values: UserLoginType) => {
    try {
      const res = await request.post("/api/login", values);
      localStorage.setItem("user", JSON.stringify(res.data));
      message.success("登陆成功");

      router.push("/book");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Head>
        <title>登陆</title>
        <meta name="description" content="图书馆里系统" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.form}>
          <div className={styles.title}>登 陆</div>
          <Form
            name="basic"
            initialValues={{ name: "", password: "" }}
            onFinish={onFinish}
            autoComplete="off"
            size="large"
          >
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input placeholder="请输入用户名" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password placeholder="请输入密码" />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className={classnames(styles.btn, styles.loginBtn)}
                size="large"
              >
                登陆
              </Button>
              <Button htmlType="submit" className={styles.btn} size="large">
                注册
              </Button>
            </Form.Item>
          </Form>
        </div>
      </main>
    </>
  );
}
