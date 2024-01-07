import PageHeader from '@components/dashboard/pageHeader';
import { useGetUsersQuery } from '@store/actions/auth';
import { useGetSellerSalesQuery } from '@store/actions/sales';
import { formatDate } from '@utils/functions/formatDate';
import { UserSchema } from '@utils/types/auth';
import { Table, Tag, Typography } from 'antd';
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
  ];
  return (
    <div className="p-page">
      <Head>
        <title>Dashboard | Stores</title>
      </Head>
      <PageHeader title="Sales" />
      <Table
        className="my-6"
        loading={isLoading}
        columns={columns}
        dataSource={data?.items}
        scroll={{
          x: 'max-content',
        }}
      />
    </div>
  );
};

export default UsersPage;
