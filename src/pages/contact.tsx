import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, notification } from 'antd';
import {
  FacebookOutlined,
  InstagramOutlined,
  MailFilled,
  MailOutlined,
  PhoneOutlined,
  TwitterOutlined,
} from '@ant-design/icons';
import { useWindowResize } from '@utils/hooks/useWindowResize';
import Head from 'next/head';
import Link from 'next/link';
import emailjs from '@emailjs/browser';
const { TextArea } = Input;

const ContactUs = () => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const onFinish = async (values: any) => {
    console.log('Form submitted:', values);
    setIsLoading(true);
    try {
      await emailjs.send(
        'service_146cykb',
        'template_cyuhg2b',
        {
          names: values.name,
          message: values.message,
          from: values.email,
        },
        'Bx8_7S9UE47JRnKef'
      );
      notification.success({ message: 'Message sent successfully' });
      form.resetFields();
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      console.log(e);
    }
  };
  const { Title, Text } = Typography;
  const { width } = useWindowResize();

  return (
    <div className="p-page">
      <Head>
        <title>Izimart | Contact</title>
      </Head>
      <Title level={3} className="text-center font-bold mb-4">
        GET IN TOUCH
      </Title>
      <div className="flex justify-center xxs:flex-col md:flex-row xxs:gap-4 md:gap-0">
        <Card className="flex flex-col items-baseline rounded-tr-none rounded-br-none">
          <Title level={5} className="text-center font-semibold text-gray-800">
            We’d love to hear from you, Our team is always here to chat.
          </Title>
          <div className="flex flex-col mt-10 gap-10 justify-start">
            <div className="flex gap-3">
              <MailOutlined className="text-3xl -mt-6" />
              <div className="">
                <Title level={5} className="font-bold my-0">
                  Chat with us
                </Title>
                <Text>Our team is here to help you!</Text>
                <br />
                <Text className="font-semibold">rolineservices3@gmail.com</Text>
              </div>
            </div>
            <div className="flex gap-4 justify-start">
              <PhoneOutlined className="text-3xl -mt-6 rotate-[225]" />
              <div>
                <Title level={5} className="font-bold my-0">
                  Phone
                </Title>
                <Text>Mon - Sat, 9AM - 7PM</Text>
                <br />
                <Text className="font-semibold">+250791789979</Text>
              </div>
            </div>
            <div className="flex flex-col gap-4 justify-start">
              <Title level={5} className="font-bold my-0">
                Follow us
              </Title>
              <div className="flex gap-4">
                <Link href="#">
                  <InstagramOutlined className="text-2xl" />
                </Link>
                <Link href="#">
                  <FacebookOutlined className="text-2xl" />
                </Link>
                <Link href="#">
                  <TwitterOutlined className="text-2xl" />
                </Link>
              </div>
            </div>
          </div>
        </Card>
        <Card
          style={{ width: width > 720 ? 500 : 'auto' }}
          className="rounded-tl-none rounded-bl-none border-l-0"
        >
          <Title level={5} className="text-center font-semibold text-gray-800">
            Do you have any enquiries? Fill the form below to reach out
            directly, Our team wil get back to you ASAP!
          </Title>
          <Form
            form={form}
            onFinish={onFinish}
            layout="vertical"
            className="contact-form"
          >
            <Form.Item
              name="name"
              label="Names"
              rules={[{ required: true, message: 'Please enter your name' }]}
            >
              <Input className="h-9" />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Please enter your email' },
                { type: 'email', message: 'Please enter a valid email' },
              ]}
            >
              <Input className="h-9" />
            </Form.Item>
            <Form.Item
              name="message"
              label="Message"
              rules={[{ required: true, message: 'Please enter your message' }]}
            >
              <TextArea rows={5} />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="bg-primary"
                block
                loading={isLoading}
              >
                Send Message
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default ContactUs;
