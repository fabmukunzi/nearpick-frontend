import React from 'react';
import { Layout, Space } from 'antd';
import HeaderComponent from '@/components/menu';

const { Header, Footer, Sider, Content } = Layout;

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 50,
  lineHeight: '64px',
  backgroundColor: '#7dbcea',
};

const footerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#7dbcea',
  zIndex: 1000,
  position: 'relative',
  marginTop:'100px',
  bottom: 0,
  left: 0,
  right: 0,
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
      <Footer style={footerStyle}>Footer</Footer>
    </Layout>
  </Space>
);

export default AppLayout;
