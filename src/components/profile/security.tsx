import React from 'react';
import { Card, Form, Input, Button, Typography, notification } from 'antd';
import { useChangePasswordMutation } from '@store/actions/auth';

const SecurityComponent = () => {
  const [form] = Form.useForm();
  const { Title } = Typography;
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const handleChangePassword = async (values: any) => {
    delete values.confirmPassword;
    const res = await changePassword(values);
    if ('data' in res) {
      notification.success({
        message: res.data.message,
      });
    }
    form.resetFields();
  };

  return (
    <Card className="border-none min-h-[100%]" size="small">
      <div className="flex flex-col gap-4 md:w-1/2">
        <Form form={form} onFinish={handleChangePassword}>
          <Title className="xxs:text-2xl mb-10">Change Password</Title>
          <Form.Item
            name="old_password"
            rules={[
              { required: true, message: 'Please enter your current password' },
            ]}
          >
            <Input.Password placeholder="Current Password" />
          </Form.Item>
          <Form.Item
            name="new_password"
            rules={[
              { required: true, message: 'Please enter your new password' },
            ]}
          >
            <Input.Password placeholder="New Password" />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            dependencies={['new_password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your new password',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('new_password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject('The two passwords do not match');
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm Password" />
          </Form.Item>
          <Form.Item>
            <Button className='bg-primary' loading={isLoading} type="primary" htmlType="submit" block>
              Confirm
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Card>
  );
};

export default SecurityComponent;
