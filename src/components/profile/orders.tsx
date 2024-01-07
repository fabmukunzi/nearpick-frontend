import React from 'react';
import { Table, Typography, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useGetOrdersQuery } from '@store/actions/order';
import { Product } from '@utils/types/product';
import { OrderItem } from '@utils/types/order';
import { formatDate } from '@utils/functions/formatDate';
const { Text } = Typography;
const columns: ColumnsType<OrderItem> = [
  {
    title: 'Order ID',
    dataIndex: 'id',
    key: 'id',
    render: (text) => <Text className="truncate">{text.slice(0,3)}</Text>,
  },
  {
    title: 'Date',
    dataIndex: 'createdAt',
    key: 'date',
    render: (text) => <Text className="truncate">{formatDate(text)}</Text>,
  },
  {
    title: 'Items',
    dataIndex: 'products',
    key: 'products',
    render: (products) => {
      return products?.map((product: Product) => product.name);
    },
  },
  {
    title: 'Price',
    dataIndex: 'total',
    key: 'total',
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

const OrdersComponent: React.FC = () => {
  const { data, isLoading } = useGetOrdersQuery();
  return (
    <Table
      loading={isLoading}
      columns={columns}
      dataSource={data?.data.items}
      scroll={{
        x: 'max-content',
      }}
    />
  );
};

export default OrdersComponent;
