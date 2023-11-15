import React from 'react';
import { Layout, Space } from 'antd';
import HeaderComponent from '@components/menu';

const { Header, Footer, Sider, Content } = Layout;

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 50,
  lineHeight: '64px',
  backgroundColor: '#7dbcea',
};

type LayoutProps = {
  children: React.ReactNode;
};
const AppLayout: React.FC<LayoutProps> = ({ children }) => (
  <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
    <Layout>
      <Header style={headerStyle}>
        <HeaderComponent />
      </Header>
      <Content>{children}</Content>
      {/* <Footer className='bg-[#1b2164] fixed bottom-0'>Footer</Footer> */}
    </Layout>
  </Space>
);

export default AppLayout;
