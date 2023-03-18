import { borrowAdd, borrowUpdate, getBookList, getUserList } from "@/api";
import { BookType, BorrowOptionType, BorrowType, UserType } from "@/types";
import { Button, Form, Select, message } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Content from "../Content";
import styles from "./index.module.css";

const BorrowForm: React.FC<any> = ({ title, editData }) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [userList, setUserList] = useState([]);
  const [bookList, setBookList] = useState([]);
  const [bookStock, setBookStock] = useState(0);

  useEffect(() => {
    getUserList().then((res) => {
      setUserList(res.data);
    });
    getBookList({ all: true }).then((res) => {
      setBookList(res.data);
    });
  }, []);

  useEffect(() => {
    form.setFieldsValue(editData);
  }, [editData, form]);

  const handleFinish = async (values: BorrowType) => {
    try {
      if (editData?._id) {
        await borrowUpdate(editData._id, values);
        message.success("编辑成功");
      } else {
        await borrowAdd(values);
        message.success("创建成功");
      }
      router.push("/borrow");
    } catch (error) {
      console.error(error);
    }
  };

  const handleBookChange = (
    value: string,
    option: BorrowOptionType | BorrowOptionType[]
  ) => {
    setBookStock((option as BorrowOptionType).stock);
  };

  return (
    <Content title={title}>
      <Form
        className={styles.form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        form={form}
        onFinish={handleFinish}
        autoComplete="off"
      >
        <Form.Item
          label="书籍名称"
          name="book"
          rules={[
            {
              required: true,
              message: "请输入名称",
            },
          ]}
        >
          <Select
            placeholder="请选择"
            showSearch
            optionFilterProp="label"
            onChange={handleBookChange}
            options={bookList.map((item: BookType) => ({
              label: item.name,
              value: item._id as string,
              stock: item.stock,
            }))}
          />
        </Form.Item>
        <Form.Item
          label="借阅用户"
          name="user"
          rules={[
            {
              required: true,
              message: "请输入名称",
            },
          ]}
        >
          <Select
            placeholder="请选择"
            showSearch
            optionFilterProp="label"
            options={userList.map((item: UserType) => ({
              label: item.name,
              value: item._id,
            }))}
          />
        </Form.Item>
        <Form.Item
          label="书籍库存"
          rules={[
            {
              required: true,
              message: "请输入名称",
            },
          ]}
        >
          {bookStock}
        </Form.Item>
        <Form.Item label=" " colon={false}>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className={styles.btn}
            // 库存<=0并且不是编辑模式，不能点击
            disabled={bookStock <= 0 && !editData?._id}
          >
            {editData?._id ? "编辑" : "创建"}
          </Button>
        </Form.Item>
      </Form>
    </Content>
  );
};

export default BorrowForm;
