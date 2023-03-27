import { Button, Form, Input, Select, Space } from "antd";

export default function Home() {
  const [form] = Form.useForm()
  const handleSearchFinish = (values) => {
    console.log(values);
  }

  const handleSearchReset = () => {
    console.log(form);
    form.resetFields()
  }

  return <>  <Form
    name="search"
    form={form}
    layout="inline"
    onFinish={handleSearchFinish}
    initialValues={{
      name: '', author: '', category: ''
    }}
  >
    <Form.Item name="name" label="名称">
      <Input placeholder="请输入" allowClear />
    </Form.Item>
    <Form.Item name="author" label="作者" >
      <Input placeholder="请输入" allowClear />
    </Form.Item>
    <Form.Item name="category" label="分类" >
      <Select
        allowClear
        showSearch
        style={{ width: 150 }}
        placeholder="请选择"
        options={[
          { value: 'jack', label: 'Jack' },
          { value: 'lucy', label: 'Lucy' },
          { value: 'Yiminghe', label: 'yiminghe' },
          { value: 'disabled', label: 'Disabled', disabled: true },
        ]} />
    </Form.Item>
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
  </Form></>;
}
