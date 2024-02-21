import { MoreOutlined } from '@ant-design/icons';
import PageHeader from '@components/dashboard/pageHeader';
import { useGetSellerSalesQuery } from '@store/actions/sales';
import { formatDate } from '@utils/functions/formatDate';
import { Sale } from '@utils/types/product';
import { Button, Popover, Table, Tag, Typography } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import Head from 'next/head';

const AnalyticsPage = () => {
  const { Text } = Typography;
  const { data, isLoading } = useGetSellerSalesQuery();
  const saleStatuses = ['completed', 'declined', 'accepted'];
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
    {
      title: 'Actions',
      key: 'action',
      render: (record) => (
        <Popover
          title="Actions"
          content={
            <div className="flex flex-col gap-4">
              {saleStatuses.map((status) => {
                if (status !== record?.status) {
                  return (
                    <Button
                      // disabled={record.id === user?.id}
                      // loading={loadRole && role === record.role}
                      // onClick={async () => {
                      //   const res = await changeUserRole({
                      //     role: role,
                      //     userId: record.id,
                      //   });
                      //   if ('data' in res) {
                      //     notification.success({
                      //       message: res?.data?.message,
                      //     });
                      //   }
                      // }}
                      key={status}
                      type="primary"
                    >
                      Change To {status}
                    </Button>
                  );
                }
              })}
            </div>
          }
        >
          <Button icon={<MoreOutlined />} />
        </Popover>
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
        loading={isLoading}
        columns={columns}
        dataSource={data?.data.items}
        scroll={{
          x: 'max-content',
        }}
      />
    </div>
  );
};

export default AnalyticsPage;
