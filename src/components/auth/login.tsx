import { useLoginMutation } from '@store/actions/auth';
import { setToken, setVerifyEmail, updateUser } from '@store/reducers/users';
import { Card, Form, Input, Button, Typography, notification } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

type FieldType = {
  email?: string;
  password?: string;
};
const Login = () => {
  const { Title } = Typography;
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const router = useRouter();
  const onFinish = async (values: any) => {
    login(values)
      .unwrap()
      .then((data) => {
        dispatch(updateUser(data?.data?.user));
        dispatch(setToken(data?.data?.token));
        notification.success({
          message: data.data?.message,
        });
        router.push('/');
      })
      .catch((error) => {
        if (error.data?.message === 'Check your email for verification code') {
          dispatch(setVerifyEmail(error?.data?.user));
          router.push('/auth/verify');
        }

        // notification.error({
        //   message: error?.data?.message||'Oops! Something went wrong',
        // });
      });
  };
  return (
    <Card className="rounded-none overflow-hidden md:shadow-2xl md:shadow-[#bfbfbf] md:w-[40%] w-[98%]">
      <Title className="text-center font-bold text-2xl ">
        Welcome Back, Login
      </Title>
      <Form
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        className="flex flex-col mx-2 p-5 text-left"
      >
        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email' },
          ]}
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
        <div className="text-right mb-10">
          Not yet a member?{' '}
          <Link href="/auth/signup" className="text-primary">
            Create an account
          </Link>
        </div>
        <Form.Item>
          <Button
            type="primary"
            loading={isLoading}
            className="w-full"
            htmlType="submit"
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};
export default Login;
