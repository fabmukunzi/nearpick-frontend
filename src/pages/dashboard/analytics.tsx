import PageHeader from '@components/dashboard/pageHeader';
import { Typography } from 'antd';

const AnalyticsPage = () => {
  const { Title } = Typography;
  return (
    <>
      <PageHeader />
      <Title level={3}>No Analytics Yet</Title>
    </>
  );
};

export default AnalyticsPage;
