import React, { useState } from 'react';
import {
  Card,
  Form,
  Input,
  Button,
  Row,
  Col,
  Tag,
  Tooltip,
  Upload,
  message,
  Image,
  Avatar,
} from 'antd';
import { EditOutlined, UploadOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { RootState } from '@store/index';

const UserInfoComponent = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const [form] = Form.useForm();
  const [isEditMode, setEditMode] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    form.resetFields();
    setEditMode(false);
  };

  const handleCancel = () => {
    form.resetFields();
    setEditMode(false);
  };
  const handleAvatarChange = (info: any) => {
    const file = info.fileList[0]?.originFileObj;
    console.log(info);
    setAvatarFile(file);
  };

  return (
    <Card
      className="border-none min-h-[100%]"
      headStyle={{ borderBottom: 'none' }}
      extra={
        <Button onClick={() => setEditMode(true)} icon={<EditOutlined />} />
      }
    >
      <div className="flex gap-3 items-start mb-6 -mt-10">
        <Avatar src={user?.avatar} alt="image" size={80} />
        <div className="flex flex-col gap-3">
          <Tag color="blue" className="w-fit">
            {user?.role}
          </Tag>
          <Upload
            beforeUpload={() => false}
            onChange={handleAvatarChange}
            className="truncate"
            accept="image/*"
          >
            <Button icon={<UploadOutlined />} className="avatar-upload-button">
              Upload Avatar
            </Button>
          </Upload>
        </div>
      </div>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSave}
        initialValues={user}
      >
        <div className="flex gap-4">
          <Form.Item name="email" label="Email">
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[
              { required: true, message: 'Please enter your phone number' },
            ]}
          >
            <Input disabled={!isEditMode} />
          </Form.Item>
        </div>
        <div className="flex gap-4">
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[
              { required: true, message: 'Please enter your first name' },
            ]}
          >
            <Input disabled={!isEditMode} />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[{ required: true, message: 'Please enter your last name' }]}
          >
            <Input disabled={!isEditMode} />
          </Form.Item>
        </div>
        <div className="w-[50%] flex gap-3">
          <Button htmlType="submit" block>
            Save
          </Button>
          <Button onClick={() => setEditMode(false)} htmlType="reset" block>
            Cancel
          </Button>
        </div>
      </Form>
    </Card>
  );
};

export default UserInfoComponent;
