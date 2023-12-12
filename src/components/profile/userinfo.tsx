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
  notification,
} from 'antd';
import { EditOutlined, UploadOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/index';
import { useProfileQuery, useUpdateProfileMutation } from '@store/actions/auth';
import { updateUser } from '@store/reducers/users';

const UserInfoComponent = () => {
  const { data, isLoading } = useProfileQuery();
  const [updateProfile, { isLoading: loadUpdate }] = useUpdateProfileMutation();
  const user = data?.user;
  const dispatch=useDispatch()
  const [form] = Form.useForm();
  const [isEditMode, setEditMode] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const handleSave = async (values: any) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('email', values.email);
    formData.append('phone', values.phone);
    if (avatarFile) {
      formData.append('avatar', avatarFile);
    }
    const res = await updateProfile(formData);
    if ('data' in res) {
      notification.success({
        message: res.data.message,
      });
    }
    dispatch(updateUser(data?.user))
    setAvatarFile(null)
    form.resetFields();
    setEditMode(false);
  };
  const handleAvatarChange = (info: any) => {
    const file = info.fileList[0]?.originFileObj;
    setAvatarFile(file);
  };

  return (
    <Card
      className="border-none min-h-[100%]"
      headStyle={{ borderBottom: 'none' }}
      loading={isLoading}
      extra={
        <Button onClick={() => setEditMode(true)} icon={<EditOutlined />} />
      }
    >
      <div className="flex gap-3 items-center mb-6 -mt-10">
        <Avatar src={<Image alt='avatar' className="h-24 object-cover" src={user?.avatar} />} alt="image" size={100} shape="square" />
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
            name="name"
            label="Names"
            rules={[
              { required: true, message: 'Please enter your first name' },
            ]}
          >
            <Input disabled={!isEditMode} />
          </Form.Item>
          {/* <Form.Item
            name="lastName"
            label="Last Name"
            rules={[{ required: true, message: 'Please enter your last name' }]}
          >
            <Input disabled={!isEditMode} />
          </Form.Item> */}
        </div>
        <div className="w-[50%] flex gap-3">
          <Button htmlType="submit" loading={loadUpdate} block>
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
