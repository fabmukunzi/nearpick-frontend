import PageHeader from '@components/dashboard/pageHeader';
import { Typography } from 'antd';

const AnalyticsPage = () => {
  const { Title } = Typography;
  return (
    <div className='p-page'>
      <PageHeader title='Sales' />
      <Title level={3}>No Sales Yet</Title>
    </div>
  );
};

export default AnalyticsPage;
