import { Card, Form, Input, Button, Typography } from 'antd';
import Link from 'next/link';

type FieldType = {
  username?: string;
  password?: string;
};
const Login = () => {
  const { Title } = Typography;
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Card className="rounded-none shadow-2xl shadow-[#bfbfbf] md:w-[40%] w-[95%]">
      <Title className="text-center font-bold text-2xl ">
        Welcome Back, Login
      </Title>
      <Form
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className="flex flex-col mx-2 p-5"
      >
        <Form.Item<FieldType>
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input className="h-10" />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password className="h-10" />
        </Form.Item>
        <div className='text-right mb-10'>
            Not yet a member? <Link href="/auth/signup">Create an account</Link>
        </div>
        <Form.Item>
          <Button type="primary" className="w-full" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};
export default Login;
