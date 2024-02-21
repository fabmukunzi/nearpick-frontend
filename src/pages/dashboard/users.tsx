import { MoreOutlined } from '@ant-design/icons';
import PageHeader from '@components/dashboard/pageHeader';
import {
  useChangeAccountStatusMutation,
  useChangeUserRoleMutation,
  useDeleteUserMutation,
  useGetUsersQuery,
} from '@store/actions/auth';
import { RootState } from '@store/index';
import { formatDate } from '@utils/functions/formatDate';
import { UserSchema } from '@utils/types/auth';
import {
  Button,
  Popconfirm,
  Space,
  Table,
  Tag,
  Typography,
  notification,
} from 'antd';
import { Popover } from 'antd/lib';
import { ColumnsType } from 'antd/lib/table';
import Head from 'next/head';
import { useSelector } from 'react-redux';

const UsersPage = () => {
  const { Title, Text } = Typography;
  const { data, isLoading } = useGetUsersQuery();
  const [changeAccountStatus, { isLoading: loadStatus }] =
    useChangeAccountStatusMutation();
  const [changeUserRole, { isLoading: loadRole }] = useChangeUserRoleMutation();
  const [deleteUser, { isLoading: loadDelete }] = useDeleteUserMutation();
  const roles = ['admin', 'seller', 'buyer'];
  const { user } = useSelector((state: RootState) => state.userReducer);
  const columns: ColumnsType<UserSchema> = [
    {
      title: 'Names',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Date Joined',
      dataIndex: 'createdAt',
      key: 'date',
      sorter: (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      render: (text) => <Text className="truncate">{formatDate(text)}</Text>,
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role) => {
        return (
          <Tag
            color={`${
              role === 'admin'
                ? 'blue'
                : `${role === 'seller' ? 'green' : 'yellow'}`
            }`}
            key={role}
          >
            {role}
          </Tag>
        );
      },
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (status) => {
        return (
          <Tag
            color={`${status === 'disabled' ? 'red' : 'green'}`}
            key={status}
          >
            {status ?? 'Active'}
          </Tag>
        );
      },
    },
    {
      title: 'Actions',
      key: 'action',
      render: (record) => (
        <Space size="middle">
          <Popconfirm
            onConfirm={async () => {
              const res = await deleteUser({
                userId: record.id,
              });
              if ('data' in res) {
                notification.success({
                  message: res?.data?.message,
                });
              }
            }}
            title="Are you sure you want to delete this user?"
            description="This action can not be undone!"
          >
            <Button type="primary" disabled={record.id === user?.id} danger>
              Delete
            </Button>
          </Popconfirm>
          <Popover
            title="Other actions"
            content={
              <div className="flex flex-col gap-4">
                {roles.map((role) => {
                  if (role !== record?.role) {
                    return (
                      <Button
                        disabled={record.id === user?.id}
                        loading={loadRole && role === record.role}
                        onClick={async () => {
                          const res = await changeUserRole({
                            role: role,
                            userId: record.id,
                          });
                          if ('data' in res) {
                            notification.success({
                              message: res?.data?.message,
                            });
                          }
                        }}
                        key={role}
                        type="primary"
                      >
                        Change To {role}
                      </Button>
                    );
                  }
                })}
                {record.status === 'disabled' ? (
                  <Button
                    disabled={record.id === user?.id}
                    type="primary"
                    onClick={async () => {
                      const res = await changeAccountStatus({
                        status: 'enabled',
                        userId: record.id,
                      });
                      if ('data' in res) {
                        notification.success({
                          message: res?.data?.message,
                        });
                      }
                    }}
                    loading={loadStatus}
                  >
                    Enable Account
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    disabled={record.id === user?.id}
                    onClick={async () => {
                      const res = await changeAccountStatus({
                        status: 'disabled',
                        userId: record.id,
                      });
                      if ('data' in res) {
                        notification.success({
                          message: res?.data?.message,
                        });
                      }
                    }}
                    loading={loadStatus}
                    danger
                  >
                    Disable Account
                  </Button>
                )}
              </div>
            }
          >
            <Button icon={<MoreOutlined />} />
          </Popover>
        </Space>
      ),
    },
  ];
  return (
    <div className="p-page">
      <Head>
        <title>Dashboard | Users</title>
      </Head>
      <PageHeader title="Users" />
      <Table
        className="my-6"
        size="small"
        loading={isLoading}
        columns={columns}
        dataSource={data?.items}
        scroll={{
          x: 'max-content',
        }}
        pagination={{
          pageSize: 6,
        }}
      />
    </div>
  );
};

export default UsersPage;
