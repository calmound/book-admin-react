import {
  borrowBack,
  borrowDelete,
  getBookList,
  getBorrowList,
  getCategoryList,
} from "@/api";
import { AuthHoc, Content, Layout } from "@/components";
import { BORROW_STATUS } from "@/constants";
import { BookType, BorrowQueryType, BorrowType, CategoryType } from "@/types";
import { useCurrentUser } from "@/utils/hoos";
import { ExclamationCircleFilled } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
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
    title: "书籍名称",
    dataIndex: "bookName",
    key: "bookName",
    ellipsis: true,
    width: 300,
  },
  {
    title: "状态",
    dataIndex: "status",
    key: "status",
    ellipsis: true,
    width: 100,
    render: (text: string) =>
      text === "on" ? (
        <Tag color="red">借出</Tag>
      ) : (
        <Tag color="green">已还</Tag>
      ),
  },
  {
    title: "书籍作者",
    dataIndex: "author",
    key: "author",
    ellipsis: true,
    width: 150,
  },
  {
    title: "借阅人",
    dataIndex: "borrowUser",
    key: "borrowUser",
    ellipsis: true,
    width: 150,
  },
  {
    title: "借阅时间",
    dataIndex: "borrowAt",
    key: "borrowAt",
    width: 200,
    render: (text: string) => dayjs(text).format("YYYY-MM-DD"),
  },
  {
    title: "归还时间",
    dataIndex: "backAt",
    key: "backAt",
    width: 200,
    render: (text: string) => (text ? dayjs(text).format("YYYY-MM-DD") : "-"),
  },
];

export default function Borrow() {
  const [form] = Form.useForm();
  const [list, setList] = useState<BorrowType[]>([]);
  const [categoryList, setCategoryList] = useState<CategoryType[]>([]);
  const [bookList, setBookList] = useState<BookType[]>([]);
  const [total, setTotal] = useState(0);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 20,
    showSizeChanger: true,
  });
  const router = useRouter();

  const columns = [
    ...COLUMNS,
    {
      title: "操作",
      dataIndex: "",
      key: "action",
      render: (_: any, row: BorrowType) => (
        <Space>
          {row.status === BORROW_STATUS.ON ? (
            <Button
              type="link"
              block
              onClick={() => {
                handleBorrowBack(row._id as string);
              }}
            >
              归还
            </Button>
          ) : null}
          <AuthHoc>
            <Button
              type="link"
              block
              onClick={() => {
                router.push(`/borrow/edit/${row._id}`);
              }}
            >
              编辑
            </Button>
          </AuthHoc>
          <AuthHoc>
            <Button
              type="link"
              block
              danger
              onClick={() => {
                handleDeleteModal(row._id as string);
              }}
            >
              删除
            </Button>
          </AuthHoc>
        </Space>
      ),
    },
  ];

  const fetchData = useCallback(
    (search?: BorrowQueryType) => {
      const { book, user, author, status } = search || {};
      getBorrowList({
        current: pagination.current as number,
        pageSize: pagination.pageSize as number,
        book,
        author,
        user,
        status,
      }).then((res) => {
        const data = res.data.map((item: BorrowType) => ({
          ...item,
          bookName: item.book.name,
          author: item.book.author,
          borrowUser: item.user.nickName,
        }));
        setList(data);
        setTotal(res.total);
      });
    },
    [pagination]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData, pagination]);

  useEffect(() => {
    getCategoryList({ all: true }).then((res) => {
      setCategoryList(res.data);
    });
    getBookList({ all: true }).then((res) => {
      setBookList(res.data);
    });
  }, []);

  const handleBorrowBack = (id: string) => {
    Modal.confirm({
      title: "确认归还？",
      icon: <ExclamationCircleFilled />,
      okText: "确定",
      cancelText: "取消",
      async onOk() {
        await borrowBack(id);
        message.success("归还成功");
        fetchData(form.getFieldsValue());
      },
    });
  };

  const handleDeleteModal = (id: string) => {
    Modal.confirm({
      title: "确认删除？",
      icon: <ExclamationCircleFilled />,
      okText: "确定",
      cancelText: "取消",
      async onOk() {
        await borrowDelete(id);
        fetchData(form.getFieldsValue());
        message.success("删除成功");
      },
    });
  };

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setPagination(pagination);
  };

  const handleSearchFinish = (values: BorrowQueryType) => {
    fetchData(values);
  };

  return (
    <Content title="书籍借阅">
      <Form
        form={form}
        name="search"
        className={styles.form}
        onFinish={handleSearchFinish}
      >
        <Row gutter={24}>
          <Col span={5}>
            <Form.Item name="book" label="书籍名称">
              <Select
                showSearch
                placeholder="请选择"
                optionFilterProp="label"
                allowClear
                options={bookList.map((item) => ({
                  label: item.name,
                  value: item._id,
                }))}
              />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item name="status" label="状态">
              <Select
                showSearch
                placeholder="请选择"
                optionFilterProp="label"
                allowClear
                options={[
                  { label: "借出", value: BORROW_STATUS.ON },
                  { label: "归还", value: BORROW_STATUS.OFF },
                ]}
              />
            </Form.Item>
          </Col>
          <AuthHoc>
            <Col span={5}>
              <Form.Item name="user" label="借阅人">
                <Select placeholder="请选择" allowClear>
                  {categoryList.map((category) => (
                    <Option key={category._id} value={category._id}>
                      {category.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </AuthHoc>
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
          scroll={{ x: 1300 }}
          pagination={{
            ...pagination,
            total: total,
            showTotal: () => `共 ${total} 条`,
          }}
        />
      </div>
    </Content>
  );
}
