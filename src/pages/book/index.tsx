import { bookDelete, getBookList } from "@/api/book";
import { getCategoryList } from "@/api/category";
import Content from "@/components/Content";
import { BookQueryType, CategoryType } from "@/type";
import {
  Button,
  Col,
  Form,
  Image,
  Input,
  Row,
  Select,
  Space,
  Table,
  TablePaginationConfig,
  Tooltip,
  message,
} from "antd";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import styles from "./index.module.css";

const COLUMNS = [
  {
    title: "名称",
    dataIndex: "name",
    key: "name",
    width: 200,
  },
  {
    title: "封面",
    dataIndex: "cover",
    key: "cover",
    width: 120,
    render: (text: string) => {
      return <Image width={50} src={text} alt="" />;
    },
  },
  {
    title: "作者",
    dataIndex: "author",
    key: "author",
    width: 120,
  },
  {
    title: "分类",
    dataIndex: "category",
    key: "category",
    width: 80,
  },
  {
    title: "描述",
    dataIndex: "description",
    key: "description",
    ellipsis: true,
    width: 200,
    render: (text: string) => {
      return (
        <Tooltip title={text} placement="topLeft">
          {text}
        </Tooltip>
      );
    },
  },
  {
    title: "库存",
    dataIndex: "stock",
    key: "stock",
    width: 80,
  },
  {
    title: "创建时间",
    dataIndex: "createdAt",
    key: "createdAt",
    width: 130,
    render: (text: string) => dayjs(text).format("YYYY-MM-DD"),
  },
];

export default function Home() {
  const [form] = Form.useForm();
  const router = useRouter();
  const [data, setData] = useState([]);
  const [categoryList, setCategoryList] = useState<CategoryType[]>([]);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 20,
    showSizeChanger: true,
    total: 0,
  });

  async function fetchData(search?: BookQueryType) {
    const res = await getBookList({
      current: pagination.current,
      pageSize: pagination.pageSize,
      ...search,
    });
    const { data } = res;
    setData(data);
    setPagination({ ...pagination, total: res.total });
  }

  useEffect(() => {
    fetchData();
    getCategoryList({ all: true }).then((res) => {
      setCategoryList(res.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearchFinish = async (values: BookQueryType) => {
    const res = await getBookList({
      ...values,
      current: 1,
      pageSize: pagination.pageSize,
    });
    setData(res.data);
    setPagination({ ...pagination, current: 1, total: res.total });
  };

  const handleSearchReset = () => {
    form.resetFields();
  };

  const handleBookEdit = (id: string) => {
    router.push(`/book/edit/${id}`);
  };

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setPagination(pagination);
    const query = form.getFieldsValue();
    getBookList({
      current: pagination.current,
      pageSize: pagination.pageSize,
      ...query,
    });
  };

  const handleBookDelete = async (id: string) => {
    await bookDelete(id);
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
            <Button
              type="link"
              onClick={() => {
                handleBookEdit(row._id);
              }}
            >
              编辑
            </Button>
            <Button
              type="link"
              danger
              onClick={() => {
                handleBookDelete(row._id);
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
      title="图书列表"
      operation={
        <Button
          type="primary"
          onClick={() => {
            router.push("/book/add");
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
            <Form.Item name="name" label="名称">
              <Input placeholder="请输入" allowClear />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item name="author" label="作者">
              <Input placeholder="请输入" allowClear />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item name="category" label="分类">
              <Select
                allowClear
                showSearch
                placeholder="请选择"
                options={categoryList.map((item) => ({
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
