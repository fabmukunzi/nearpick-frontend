import React from 'react';
import { Card, Form, Input, Button, Typography } from 'antd';

const SecurityComponent = () => {
  const [form] = Form.useForm();
  const { Title } = Typography;
  const onFinish = (values: any) => {
    // Perform password confirmation logic here
    // ...

    // Reset the form
    form.resetFields();
  };

  return (
    <Card className="border-none min-h-[100%]">
      <div className="flex flex-col gap-4 w-1/2">
        <Form form={form} onFinish={onFinish}>
          <Title>Change Password</Title>
          <Form.Item
            name="currentPassword"
            rules={[
              { required: true, message: 'Please enter your current password' },
            ]}
          >
            <Input.Password placeholder="Current Password" />
          </Form.Item>
          <Form.Item
            name="newPassword"
            rules={[
              { required: true, message: 'Please enter your new password' },
            ]}
          >
            <Input.Password placeholder="New Password" />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            dependencies={['newPassword']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your new password',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
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
            <Button type="primary" htmlType="submit" block>
              Confirm
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Card>
  );
};

export default SecurityComponent;
