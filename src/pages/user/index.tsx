import { getUserList, userDelete, userUpdate } from "@/api";
import { Content } from "@/components";
import { USER_STATUS } from "@/constants";
import { BookType, CategoryType, UserQueryType, UserType } from "@/types";
import { useCurrentUser } from "@/utils/hoos";
import { ExclamationCircleFilled } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Table,
  TablePaginationConfig,
  Tag,
  message,
} from "antd";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

import styles from "./index.module.css";

const Option = Select.Option;

const COLUMNS = [
  {
    title: "账号",
    dataIndex: "name",
    key: "name",
    ellipsis: true,
    width: 200,
  },
  {
    title: "用户名",
    dataIndex: "nickName",
    key: "nickName",
    ellipsis: true,
    width: 200,
  },
  {
    title: "状态",
    dataIndex: "status",
    key: "status",
    ellipsis: true,
    width: 150,
    render: (text: string) =>
      text === "on" ? (
        <Tag color="green">正常</Tag>
      ) : (
        <Tag color="red">已禁用</Tag>
      ),
  },
  {
    title: "创建时间",
    dataIndex: "createdAt",
    key: "createdAt",
    width: 200,
    render: (text: number) => {
      return dayjs(text).format("YYYY-MM-DD");
    },
  },
];

export default function Book() {
  const [form] = Form.useForm();
  const user = useCurrentUser();
  const [list, setList] = useState<UserType[]>([]);

  const [categoryList, setCategoryList] = useState<CategoryType[]>([]);
  const [total, setTotal] = useState(0);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 20,
    showSizeChanger: true,
  });
  const [editData, setEditData] = useState<Partial<BookType>>({});
  const router = useRouter();

  const columns = [
    ...COLUMNS,
    {
      title: "操作",
      dataIndex: "",
      key: "action",
      render: (_: any, row: UserType) => (
        <Space>
          <Button
            type="link"
            onClick={() => {
              setEditData(row);
              router.push(`/user/edit/${row._id}`);
            }}
          >
            编辑
          </Button>
          <Button
            type="link"
            danger={row.status === USER_STATUS.ON}
            onClick={() => {
              handleStatusUpdate(row);
            }}
          >
            {row.status === USER_STATUS.ON ? "禁用" : "启动"}
          </Button>
          <Button
            type="link"
            danger
            onClick={() => {
              handleDeleteModal(row._id as string);
            }}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const fetchData = useCallback(
    (search?: UserQueryType) => {
      const { name, status } = search || {};
      getUserList({
        current: pagination.current as number,
        pageSize: pagination.pageSize as number,
        ...(name && { name }),
        ...(status && { status }),
      }).then((res) => {
        setList(res.data);
        setTotal(res.total);
      });
    },
    [pagination]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData, pagination]);

  const handleAdd = () => {
    router.push("/user/add");
  };

  const handleDeleteModal = (_id: string) => {
    Modal.confirm({
      title: "确认删除？",
      icon: <ExclamationCircleFilled />,
      okText: "确定",
      cancelText: "取消",
      async onOk() {
        await userDelete(_id);
        message.success("删除成功");
        fetchData(form.getFieldsValue());
      },
    });
  };

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setPagination(pagination);
  };

  const handleSearchFinish = (values: UserQueryType) => {
    fetchData(values);
  };

  const handleStatusUpdate = async (row: UserType) => {
    await userUpdate(row._id as string, {
      ...row,
      status: row.status === USER_STATUS.ON ? USER_STATUS.OFF : USER_STATUS.ON,
    });
    fetchData(form.getFieldsValue());
  };

  return (
    <>
      <Content
        title="用户列表"
        operation={
          <Button type="primary" onClick={handleAdd}>
            添加
          </Button>
        }
      >
        <Form
          form={form}
          name="search"
          className={styles.form}
          onFinish={handleSearchFinish}
        >
          <Row gutter={24}>
            <Col span={5}>
              <Form.Item name="name" label="名称">
                <Input placeholder="请输入" allowClear />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item name="status" label="状态">
                <Select placeholder="请选择" allowClear>
                  <Option key={USER_STATUS.ON} value={USER_STATUS.ON}>
                    正常
                  </Option>
                  <Option key={USER_STATUS.OFF} value={USER_STATUS.OFF}>
                    禁用
                  </Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={9} style={{ textAlign: "left" }}>
              <Button type="primary" htmlType="submit">
                搜索
              </Button>
              <Button
                style={{ margin: "0 8px" }}
                onClick={() => {
                  form.resetFields();
                }}
              >
                清空
              </Button>
            </Col>
          </Row>
        </Form>
        <div className={styles.tableWrap}>
          <Table
            rowKey="_id"
            dataSource={list}
            columns={columns}
            onChange={handleTableChange}
            pagination={{
              ...pagination,
              total: total,
              showTotal: () => `共 ${total} 条`,
            }}
          />
        </div>
      </Content>
    </>
  );
}
