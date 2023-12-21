import PageHeader from '@components/dashboard/pageHeader';
import { Typography } from 'antd';
import Head from 'next/head';

const AnalyticsPage = () => {
  const { Title } = Typography;
  return (
    <div className="p-page">
      <Head>
        <title>Dashboard | Stores</title>
      </Head>
      <PageHeader title="Sales" />
      <Title level={3}>No Sales Yet</Title>
    </div>
  );
};

export default AnalyticsPage;
