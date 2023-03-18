import { getCategoryList } from "@/api";
import { bookAdd, bookUpdate } from "@/api/book";
import { BookFormType, BookType, CategoryType } from "@/types";
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
import "dayjs/locale/zh-cn";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

import Content from "../Content";
import styles from "./index.module.css";

const Option = Select.Option;
const { TextArea } = Input;

const BookForm: React.FC<BookFormType> = ({ title, editData }) => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [categoryList, setCategoryList] = useState<CategoryType[]>([]);
  const [preview, setPreview] = useState();
  const [cover, setCover] = useState();

  useEffect(() => {
    getCategoryList({
      all: true,
    }).then((res) => {
      setCategoryList(res.data);
    });
  }, []);

  useEffect(() => {
    if (editData) {
      const data = {
        ...editData,
        category: editData.category
          ? (editData.category as unknown as CategoryType)._id
          : undefined,
        publishAt: editData.publishAt ? dayjs(editData.publishAt) : undefined,
      };
      setCover(editData.cover);
      form.setFieldsValue(data);
    }
  }, [editData, form]);

  const handleFinish = async (values: BookType) => {
    console.log(
      "%c [ values ]-53",
      "font-size:13px; background:pink; color:#bf2c9f;",
      values
    );
    // 编辑
    if (values.publishAt) {
      values.publishAt = dayjs(values.publishAt).valueOf();
    }
    if (editData?._id) {
      await bookUpdate(editData._id, values);
      message.success("编辑成功");
    } else {
      await bookAdd(values);
      message.success("创建成功");
    }
    router.push("/book");
  };

  const handlePreview = () => {
    setPreview(form.getFieldValue("cover"));
  };

  {
    categoryList?.map((category) => (
      <Option value={category._id} key={category._id}>
        {category.name}
      </Option>
    ));
  }

  return (
    <>
      <Content title={title}>
        <Form
          name="book"
          form={form}
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 18 }}
          className={styles.form}
          initialValues={editData ? editData : {}}
          onFinish={handleFinish}
          autoComplete="off"
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
                message: "请选择图书分类",
              },
            ]}
          >
            <Select>
              {categoryList.map((category) => (
                <Option value={category._id} key={category._id}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="封面" name="cover">
            <Input.Group compact>
              <Input
                style={{ width: "calc(100% - 65px)" }}
                value={cover}
                onChange={(e) => {
                  setCover(e.target.value);
                  form.setFieldValue("cover", e.target.value);
                }}
              />
              <Button type="primary" onClick={handlePreview}>
                预览
              </Button>
            </Input.Group>
          </Form.Item>
          {preview && (
            <Form.Item label=" " colon={false}>
              <Image width={200} height={200} alt="封面" src={preview} />
            </Form.Item>
          )}
          <Form.Item
            label="出版日期"
            name="publishAt"
            className={styles.publishAt}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item label="库存" name="stock">
            <InputNumber />
          </Form.Item>
          <Form.Item label="描述" name="description">
            <TextArea className={styles.textarea} />
          </Form.Item>
          <Form.Item label=" " colon={false}>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className={styles.btn}
            >
              {editData?._id ? "更新" : "创建"}
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </>
  );
};

export default BookForm;
