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
  Popover,
  Popconfirm,
} from 'antd';
import { EditOutlined, UploadOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/index';
import {
  useDeleteUserMutation,
  useProfileQuery,
  useUpdateProfileMutation,
} from '@store/actions/auth';
import { logout, setToken, updateUser } from '@store/reducers/users';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useWindowResize } from '@utils/hooks/useWindowResize';

const UserInfoComponent = () => {
  const { data, isLoading } = useProfileQuery();
  const [updateProfile, { isLoading: loadUpdate }] = useUpdateProfileMutation();
  const [deleteUser, { isLoading: loadDelete }] = useDeleteUserMutation();
  const user = data?.user;
  const dispatch = useDispatch();
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
    dispatch(updateUser(data?.user));
    setAvatarFile(null);
    form.resetFields();
    setEditMode(false);
  };
  const handleAvatarChange = (info: any) => {
    const file = info.fileList[0]?.originFileObj;
    setAvatarFile(file);
  };

  return (
    <Card
      size="small"
      className="border-none min-h-[100%]"
      headStyle={{ borderBottom: 'none' }}
      loading={isLoading}
      extra={
        <Button
          className="bg-primary"
          onClick={() => setEditMode(true)}
          icon={<EditOutlined />}
        />
      }
    >
      <div className="flex gap-3 items-center mb-6 -mt-10">
        <div className="flex flex-col gap-1">
          <Avatar
            src={
              <Image
                alt="avatar"
                className="h-24 object-cover"
                src={user?.avatar}
              />
            }
            alt="image"
            size={100}
            shape="square"
          />
          <Tag color="blue" className="w-full text-center">
            {user?.role}
          </Tag>
        </div>
        <div className="flex flex-col gap-3">
          <Popconfirm
            title="Are you sure you want to delete this account!"
            description="This action can not be undone!"
            onConfirm={async () => {
              const res = await deleteUser({ userId: user?.id || '' });
              if ('data' in res) {
                if (
                  res.data.message === 'Account has been deleted successfully'
                ) {
                  dispatch(logout(undefined));
                  location.href = '/';
                }
              }
            }}
          >
            <Button
              type="primary"
              danger
              className="w-fit"
              loading={loadDelete}
            >
              Delete Account
            </Button>
          </Popconfirm>
          <Upload
            beforeUpload={() => false}
            onChange={handleAvatarChange}
            className="truncate"
            accept=".jpg, .png, .webp, .jpeg, .gif"
          >
            <Button
              type="primary"
              icon={<UploadOutlined />}
              disabled={!isEditMode}
              className="bg-primary"
            >
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
        <div className="md:flex gap-4 w-full">
          <Popover content="We don't alllow our users to change their emails.">
            <Form.Item name="email" label="Email">
              <Input disabled />
            </Form.Item>
          </Popover>
          <Form.Item
            label="Phone Number"
            name="phone"
            className="xxs:w-full md:w-auto"
            rules={[
              { required: true, message: 'Please input your phone number!' },
            ]}
          >
            <PhoneInput
              disabled={!isEditMode}
              inputStyle={{ width: '100%', height: 30 }}
              country={'rw'}
            />
          </Form.Item>
        </div>
        <div className="md:flex gap-4">
          <Form.Item
            name="name"
            label="Names"
            rules={[{ required: true, message: 'Please enter your names' }]}
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
        <div className="md:w-[50%] flex gap-3">
          <Button
            htmlType="submit"
            type="primary"
            loading={loadUpdate}
            disabled={!isEditMode}
            block
          >
            Save
          </Button>
          <Button
            type="primary"
            onClick={() => setEditMode(false)}
            htmlType="reset"
            disabled={!isEditMode}
            block
            danger
          >
            Cancel
          </Button>
        </div>
      </Form>
    </Card>
  );
};

export default UserInfoComponent;
