import PageHeader from '@components/dashboard/pageHeader';
import { Typography } from 'antd';
import Head from 'next/head';

const AnalyticsPage = () => {
  const { Title } = Typography;
  return (
    <>
      <Head>
        <title>Dashboard | Analytics</title>
      </Head>
      <PageHeader />
      <Title level={3}>No Analytics Yet</Title>
    </>
  );
};

export default AnalyticsPage;
