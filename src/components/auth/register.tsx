import { useSignupMutation } from '@store/actions/auth';
import {
  Card,
  Form,
  Input,
  Button,
  Typography,
  Radio,
  RadioChangeEvent,
  notification,
} from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

type FieldType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  role: string;
  confirmPassword?: string;
};
const Signup = () => {
  const { Title } = Typography;
  const [signup, { isLoading }] = useSignupMutation();
  const router = useRouter();
  const options = [
    { label: 'Buyer', value: 'buyer' },
    { label: 'Seller', value: 'seller' },
  ];
  const onFinish = async (values: FieldType) => {
    delete values.confirmPassword;
    signup(values)
      .unwrap()
      .then((data) => {
        notification.success({
          message: data.data?.message,
        });
        router.push('/auth/login');
      })
      .catch((error) => {
        console.log(error);
        notification.error({
          message: error?.data?.message||'Oops! Something went wrong',
        });
      });
  };
  return (
    <Card className="rounded-none md:shadow-2xl shadow-[#bfbfbf] h-fit md:w-[40%]">
      <Title className="text-center font-bold text-2xl ">
        Create an account
      </Title>
      <Form
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        className="flex flex-col mx-2 md:p-5 p-0 text-left"
      >
        <div className="flex justify-between md:gap-4 gap-0 flex-wrap md:flex-nowrap">
          <Form.Item<FieldType>
            label="First Name"
            name="firstName"
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
            name="lastName"
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
            name="phoneNumber"
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

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password className="h-10" />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          className="-mt-2"
          rules={[
            { required: true, message: 'Please confirm your password!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Passwords doesn't match!"));
              },
            }),
          ]}
        >
          <Input.Password className="h-10" />
        </Form.Item>
        <Title className="text-lg">Register as</Title>
        <Form.Item
          name="role"
          rules={[{ required: true, message: 'Please select account type' }]}
        >
          <Radio.Group
            options={options}
            optionType="button"
            buttonStyle="solid"
          />
        </Form.Item>
        <div className="text-right my-3">
          Already a member?{' '}
          <Link href="/auth/login" className="text-primary">
            Login
          </Link>
        </div>
        <Form.Item>
          <Button
            type="primary"
            loading={isLoading}
            className="w-full"
            htmlType="submit"
          >
            Register
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};
export default Signup;
