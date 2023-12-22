import { MailFilled, MailOutlined } from '@ant-design/icons';
import { useLoginMutation, useVerifyCodeMutation } from '@store/actions/auth';
import { setToken, updateUser } from '@store/reducers/users';
import { Card, Form, Input, Button, Typography, notification } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import OTPInput from 'react-otp-input';
import { theme as antdTheme } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/index';

type FieldType = {
  email?: string;
  authCode?: string;
};
const Verify = () => {
  const { Title, Text } = Typography;
  const [verifyCode, { isLoading }] = useVerifyCodeMutation();
  const { verifyUser } = useSelector((state: RootState) => state.userReducer);
  const dispatch = useDispatch();
  const router = useRouter();
  const [otp, setOtp] = useState('');
  const { useToken } = antdTheme;

  const { token } = useToken();
  const onFinish = async (values: any) => {
    verifyCode({ authCode: values, id: verifyUser?.id })
      .unwrap()
      .then((data) => {
        dispatch(updateUser(data?.data?.user));
        dispatch(setToken(data?.data?.token));
        notification.success({
          message: data.data?.message,
        });
        router.push('/dashboard/products');
      })
      .catch((error) => {
        console.error(error);
        // if (error.data.message === 'Check your email for verification code')
        //   router.push('/');
      });
  };
  return (
    <Card className="rounded-none overflow-hidden md:shadow-2xl md:shadow-[#bfbfbf] md:w-[40%] w-[98%]">
      <MailOutlined className="text-8xl text-primary flex justify-center" />
      <Title className="text-center font-bold text-2xl ">
        Check Your Email
      </Title>
      <Text className="text-gray-500flex justify-center">
        We have send 6-digit confirmation code to <b>{verifyUser?.email}</b>,
        please enter the code in below box to verify your email.
      </Text>
      <Form
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        className="flex flex-col mx-2 p-5 text-left"
      >
        <Form.Item<FieldType>
          //   label="Password"
          className="mx-auto"
          name="authCode"
          rules={[{ required: true, message: 'Please enter the code!' }]}
        >
          <OTPInput
            value={otp}
            onChange={setOtp}
            renderSeparator={<span> </span>}
            numInputs={6}
            renderInput={(props) => <input {...props} />}
            inputType="text"
            // placeholder="000000"
            inputStyle={{
              width: '3.5rem',
              height: '3.5rem',
              marginRight: '3px',
              marginLeft: '3px',
              fontWeight: 'bold',
              fontSize: token.fontSize + 4,
              outline: 'none',
              borderRadius: token.borderRadius,
              borderWidth: '2px',
              borderStyle: 'solid',
              borderColor: token.colorPrimary,
            //   color: token.colorWhite,
            }}
            shouldAutoFocus
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            loading={isLoading}
            className="w-full bg-primary"
            htmlType="submit"
          >
            Verify
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};
export default Verify;
