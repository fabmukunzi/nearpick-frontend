import PageHeader from '@components/dashboard/pageHeader';
import { useGetUsersQuery } from '@store/actions/auth';
import { useGetSellerSalesQuery } from '@store/actions/sales';
import { formatDate } from '@utils/functions/formatDate';
import { UserSchema } from '@utils/types/auth';
import { Button, Space, Table, Tag, Typography } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import Head from 'next/head';

const UsersPage = () => {
  const { Title, Text } = Typography;
  const { data, isLoading } = useGetUsersQuery();
  const columns: ColumnsType<UserSchema> = [
    {
      title: 'Names',
      dataIndex: 'name',
      key: 'name',
      // render: (text) => <Text>{text.name}</Text>,
    },
    {
      title: 'Date Joined',
      dataIndex: 'createdAt',
      key: 'date',
      sorter: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
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
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (status) => {
        return (
          <Tag
            color={`${status === 'disabled' ? 'yellow' : 'green'}`}
            key={status}
          >
            {status ?? 'Active'}
          </Tag>
        );
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Space size="middle">
          <Button>Edit</Button>
          <Button className='bg-red-500'>Delete</Button>
        </Space>
      ),
    },
  ];
  return (
    <div className="p-page">
      <Head>
        <title>Dashboard | Stores</title>
      </Head>
      <PageHeader title="Sales" />
      <Table
        className="my-6"
        size='small'
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
