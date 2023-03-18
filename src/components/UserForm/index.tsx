import { userAdd, userUpdate } from "@/api";
import { Content } from "@/components";
import { USER_ROLE, USER_SEX, USER_STATUS } from "@/constants";
import { UserFormProps, UserType } from "@/types";
import { useCurrentUser } from "@/utils/hoos";
import { Button, Form, Input, Radio, message } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import styles from "./index.module.css";

const UserForm: React.FC<UserFormProps> = ({
  title,
  editData = {
    sex: USER_SEX.MALE,
    status: USER_STATUS.ON,
    role: USER_ROLE.USER,
    _id: null,
  },
}) => {
  const [form] = Form.useForm();
  const router = useRouter();

  const user = useCurrentUser();
  useEffect(() => {
    form.setFieldsValue(editData);
  }, [editData, form]);

  const handleFinish = async (values: UserType) => {
    try {
      if (editData?._id) {
        await userUpdate(editData._id, values);
        message.success("编辑成功");
      } else {
        await userAdd(values);
        message.success("创建成功");
      }
      setTimeout(() => {
        router.push("/user");
      });
    } catch (error) {
      console.error(error);
    }
  };

  const isEdit = !!editData?._id;

  return (
    <>
      <Content title={title}>
        <Form
          name="book"
          form={form}
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 18 }}
          className={styles.form}
          initialValues={editData}
          onFinish={handleFinish}
          autoComplete="off"
        >
          <Form.Item
            label="账号"
            extra="用于登陆的账号"
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
            label="名称"
            extra="用于展示的名称"
            name="nickName"
            rules={[
              {
                required: true,
                message: "请输入名称",
              },
            ]}
          >
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item label="性别" name="sex">
            <Radio.Group>
              <Radio value="male">男</Radio>
              <Radio value="female">女</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[
              {
                required: isEdit ? false : true,
                message: "请输入作者",
              },
            ]}
          >
            <Input.Password placeholder="请输入" type="password" />
          </Form.Item>
          <Form.Item label="状态" name="status">
            <Radio.Group disabled={user?.role === USER_ROLE.USER}>
              <Radio value="on">启用</Radio>
              <Radio value="off">禁用</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="角色" name="role">
            <Radio.Group disabled={user?.role === USER_ROLE.USER}>
              <Radio value="user">用户</Radio>
              <Radio value="admin">管理员</Radio>
            </Radio.Group>
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

export default UserForm;
