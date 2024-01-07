import PageHeader from '@components/dashboard/pageHeader';
import { useGetSellerSalesQuery } from '@store/actions/sales';
import { formatDate } from '@utils/functions/formatDate';
import { Sale } from '@utils/types/product';
import { Table, Tag, Typography } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import Head from 'next/head';

const AnalyticsPage = () => {
  const { Title, Text } = Typography;
  const { data, isLoading } = useGetSellerSalesQuery();
  const columns: ColumnsType<Sale> = [
    {
      title: 'Product',
      dataIndex: 'Product',
      key: 'Product',
      render: (text) => <Text>{text.name}</Text>,
    },
    {
      title: 'Date Ordered',
      dataIndex: 'createdAt',
      key: 'date',
      render: (text) => <Text className="truncate">{formatDate(text)}</Text>,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantitySold',
      key: 'quantity',
    },
    {
      title: 'Price',
      dataIndex: 'total',
      key: 'total',
      render: (_, record: Sale) => {
        return record.quantitySold * record.Product.price;
      },
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (status) => {
        return (
          <Tag
            color={`${
              status === 'pending'
                ? 'yellow'
                : status === 'completed'
                ? 'green'
                : 'red'
            }`}
            key={status}
          >
            {status}
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
        dataSource={data?.data}
        scroll={{
          x: 'max-content',
        }}
      />
    </div>
  );
};

export default AnalyticsPage;
