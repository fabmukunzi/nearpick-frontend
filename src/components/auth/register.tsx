import { Card, Form, Input, Button, Typography } from 'antd';
import Link from 'next/link';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

type FieldType = {
  firstname: string;
  lastname: string;
  email?: string;
  password?: string;
  phone?: string;
  store?: string;
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
        Create an account
      </Title>
      <Form
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className="flex flex-col mx-2 md:p-5 p-0"
      >
        <div className="flex justify-between md:gap-4 gap-0 flex-wrap md:flex-nowrap">
          <Form.Item<FieldType>
            label="First Name"
            name="firstname"
            className="w-full"
            rules={[
              { required: true, message: 'Please input your first name!' },
            ]}
          >
            <Input className="h-10" />
          </Form.Item>
          <Form.Item<FieldType>
            label="Last Name"
            className="w-full"
            name="lastname"
          >
            <Input className="h-10" />
          </Form.Item>
        </div>
        <div className="flex justify-between md:gap-4 gap-0 flex-wrap md:flex-nowrap">
          <Form.Item<FieldType>
            label="Email"
            name="email"
            className="w-full"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input className="h-10" />
          </Form.Item>
          <Form.Item<FieldType>
            label="Phone Number"
            name="phone"
            className="w-full"
            rules={[
              { required: true, message: 'Please input your phone number!' },
            ]}
          >
            <PhoneInput
              inputStyle={{ width: 'auto', height: 40 }}
              country={'rw'}
            />
          </Form.Item>
        </div>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password className="h-10" />
        </Form.Item>
        <div className="text-right mb-10">
          Already a member? <Link href="/auth/login">Login</Link>
        </div>
        <Form.Item>
          <Button type="primary" className="w-full" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};
export default Login;
