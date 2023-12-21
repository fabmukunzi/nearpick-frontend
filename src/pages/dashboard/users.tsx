import { Typography } from 'antd';
import Head from 'next/head';

const UsersPage = () => {
  const { Title } = Typography;
  return (
    <>
      <Head>
        <title>Dashboard | Users</title>
      </Head>
      <Title level={3}>No Users Yet</Title>
    </>
  );
};

export default UsersPage;
