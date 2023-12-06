import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
const { TextArea } = Input;

const ContactUs = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    // Add your logic for handling the form submission (e.g., sending an email, API call, etc.)
    console.log('Form submitted:', values);
  };

  return (
    <div className="contact-us-container">
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        className="contact-form"
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please enter your name' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Please enter a valid email' },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="subject"
          label="Subject"
          rules={[{ required: true, message: 'Please enter the subject' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="message"
          label="Message"
          rules={[{ required: true, message: 'Please enter your message' }]}
        >
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="custom-submit-button"
          >
            Send Message
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ContactUs;
