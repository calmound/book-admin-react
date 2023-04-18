import { bookAdd } from "@/api/book";
import { getCategoryList } from "@/api/category";
import { BookType, CategoryType } from "@/type";
import {
  Button,
  DatePicker,
  Form,
  Image,
  Input,
  InputNumber,
  Select,
  message,
} from "antd";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import Content from "../Content";
import styles from "./index.module.css";

const { RangePicker } = DatePicker;
const { TextArea } = Input;

export default function BookForm({ title }: { title: string }) {
  const [preview, setPreview] = useState("");
  const [form] = Form.useForm();
  const [categoryList, setCategoryList] = useState<CategoryType[]>([]);
  const router = useRouter();

  const handleFinish = async (values: BookType) => {
    if (values.publishAt) {
      values.publishAt = dayjs(values.publishAt).valueOf();
    }
    await bookAdd(values);
    message.success("创建成功");
    router.push("/book");
  };

  useEffect(() => {
    getCategoryList({ all: true }).then((res) => {
      setCategoryList(res.data);
    });
  }, []);

  return (
    <Content title={title}>
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        layout="horizontal"
        onFinish={handleFinish}
      >
        <Form.Item
          label="名称"
          name="name"
          rules={[
            {
              required: true,
              message: "请输入名称",
            },
          ]}
        >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item
          label="作者"
          name="author"
          rules={[
            {
              required: true,
              message: "请输入作者",
            },
          ]}
        >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item
          label="分类"
          name="category"
          rules={[
            {
              required: true,
              message: "请选择分类",
            },
          ]}
        >
          <Select
            placeholder="请选择"
            options={categoryList.map((item) => ({
              label: item.name,
              value: item._id,
            }))}
          ></Select>
        </Form.Item>
        <Form.Item label="封面" name="cover">
          <Input.Group compact>
            <Input
              placeholder="请输入"
              style={{ width: "calc(100% - 63px)" }}
              onChange={(e) => {
                form.setFieldValue("cover", e.target.value);
              }}
            />
            <Button
              type="primary"
              onClick={(e) => {
                setPreview(form.getFieldValue("cover"));
              }}
            >
              预览
            </Button>
          </Input.Group>
        </Form.Item>
        {preview && (
          <Form.Item label=" " colon={false}>
            <Image src={preview} width={100} height={100} alt="" />
          </Form.Item>
        )}
        <Form.Item label="出版日期" name="publishAt">
          <DatePicker placeholder="请选择" />
        </Form.Item>
        <Form.Item label="库存" name="stock">
          <InputNumber placeholder="请输入" />
        </Form.Item>
        <Form.Item label="描述" name="description">
          <TextArea rows={4} placeholder="请输入" />
        </Form.Item>
        <Form.Item label=" " colon={false}>
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            className={styles.btn}
          >
            创建
          </Button>
        </Form.Item>
      </Form>
    </Content>
  );
}
