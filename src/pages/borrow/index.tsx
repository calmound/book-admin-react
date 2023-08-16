import { bookDelete, getBookList } from "@/api/book";
import { borrowDelete, getBorrowList } from "@/api/borrow";
import Content from "@/components/Content";
import { BookType, BorrowQueryType, BorrowType } from "@/type";
import {
  Button,
  Col,
  Form,
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
import { useEffect, useState } from "react";

import styles from "./index.module.css";

const STATUS_OPTIONS = [
  {
    label: "借出",
    value: "on",
  },
  {
    label: "归还",
    value: "off",
  },
];

const COLUMNS = [
  {
    title: "名称",
    dataIndex: "bookName",
    key: "bookName",
    width: 200,
  },
  {
    title: "状态",
    dataIndex: "status",
    key: "status",
    width: 80,
    render: (text: string) =>
      text === "on" ? (
        <Tag color="red">借出</Tag>
      ) : (
        <Tag color="green">已还</Tag>
      ),
  },
  {
    title: "借阅人",
    dataIndex: "borrowUser",
    key: "borrowUser",
    width: 80,
  },
  {
    title: "借阅时间",
    dataIndex: "borrowAt",
    key: "borrowAt",
    width: 130,
    render: (text: string) => dayjs(text).format("YYYY-MM-DD"),
  },
  {
    title: "归还时间",
    dataIndex: "backAt",
    key: "backAt",
    width: 130,
    render: (text: string) => dayjs(text).format("YYYY-MM-DD"),
  },
];

export default function Borrow() {
  const [form] = Form.useForm();
  const router = useRouter();
  const [data, setData] = useState([]);
  const [bookList, setBookList] = useState<BookType[]>([]);
  // todo ts type
  const [userList, setUserList] = useState<any[]>([]);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 20,
    showSizeChanger: true,
    total: 0,
  });

  async function fetchData(search?: BorrowQueryType) {
    const res = await getBorrowList({
      current: pagination.current,
      pageSize: pagination.pageSize,
      ...search,
    });
    const newData = res.data.map((item: BorrowType) => ({
      ...item,
      bookName: item.book.name,
      borrowUser: item.user.nickName,
    }));
    setData(newData);
    setPagination({ ...pagination, total: res.total });
  }

  useEffect(() => {
    fetchData();
    getBookList({ all: true }).then((res) => {
      setBookList(res.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearchFinish = async (values: BorrowQueryType) => {
    const res = await getBorrowList({
      ...values,
      current: 1,
      pageSize: pagination.pageSize,
    });
    const newData = res.data.map((item: BorrowType) => ({
      ...item,
      bookName: item.book.name,
      borrowUser: item.user.nickName,
    }));
    setData(newData);
    setPagination({ ...pagination, current: 1, total: res.total });
  };

  const handleSearchReset = () => {
    form.resetFields();
  };

  const handleBorrowEdit = (id: string) => {
    router.push(`/borrow/edit/${id}`);
  };

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setPagination(pagination);
    const query = form.getFieldsValue();
    getBorrowList({
      current: pagination.current,
      pageSize: pagination.pageSize,
      ...query,
    });
  };

  const handleBorrowDelete = async (id: string) => {
    await borrowDelete(id);
    message.success("删除成功");
    fetchData(form.getFieldsValue());
  };

  const columns = [
    ...COLUMNS,
    {
      title: "操作",
      key: "action",
      render: (_: any, row: any) => {
        return (
          <Space>
            {row.status === "on" && (
              <Button
                type="link"
                onClick={() => {
                  handleBorrowEdit(row._id);
                }}
              >
                归还
              </Button>
            )}
            <Button
              type="link"
              danger
              onClick={() => {
                handleBorrowDelete(row._id);
              }}
            >
              删除
            </Button>
          </Space>
        );
      },
    },
  ];

  return (
    <Content
      title="借阅列表"
      operation={
        <Button
          type="primary"
          onClick={() => {
            router.push("/borrow/add");
          }}
        >
          添加
        </Button>
      }
    >
      <Form
        name="search"
        form={form}
        onFinish={handleSearchFinish}
        initialValues={{
          name: "",
          author: "",
          category: "",
        }}
      >
        <Row gutter={24}>
          <Col span={5}>
            <Form.Item name="name" label="书籍名称">
              <Select
                allowClear
                showSearch
                optionFilterProp="label"
                options={bookList.map((item) => ({
                  label: item.name,
                  value: item._id,
                }))}
              ></Select>
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item name="status" label="状态">
              <Select allowClear options={STATUS_OPTIONS}></Select>
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item name="user" label="借阅人">
              <Select
                allowClear
                showSearch
                placeholder="请选择"
                options={userList.map((item) => ({
                  label: item.name,
                  value: item._id,
                }))}
              />
            </Form.Item>
          </Col>
          <Col span={9}>
            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  搜索
                </Button>
                <Button htmlType="submit" onClick={handleSearchReset}>
                  清空
                </Button>
              </Space>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <div className={styles.tableWrap}>
        <Table
          dataSource={data}
          columns={columns}
          scroll={{ x: 1000 }}
          onChange={handleTableChange}
          pagination={{
            ...pagination,
            showTotal: () => `共 ${pagination.total} 条`,
          }}
        />
      </div>
    </Content>
  );
}
