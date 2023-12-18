import PageHeader from '@components/dashboard/pageHeader';
import ProfileComponent from '@components/profile';
import { Card, Typography } from 'antd';

const UsersPage = () => {
  const { Title } = Typography;
  return (
    <Card className="min-h-screen">
      <PageHeader
        title="Profile"
        // action={toggle}
        // actionLabel="Create a product"
        // icon={<PlusOutlined className="inline" />}
      />
      <div className='p-page -ml-44'>
      <ProfileComponent />
      </div>
    </Card>
  );
};

export default UsersPage;
