import React, { useState } from 'react';
import {
  AppstoreOutlined,
  LogoutOutlined,
  ShopOutlined,
  ShoppingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Avatar, Breadcrumb, Button, Layout, Menu, theme } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Analytics', '1', <AppstoreOutlined className='text-xl mx-1' />),
  getItem('Products', '2', <ShoppingOutlined className='text-xl mx-1' />),
  getItem('Stores', '3', <ShopOutlined className='text-xl mx-1' />),
  getItem('Users', '4', <UserOutlined className='text-xl mx-1' />),
];

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        theme="light"
        breakpoint="lg"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Avatar
          className="flex mx-auto mb-10"
          size={collapsed?50:80}
          src="https://res.cloudinary.com/dr4reow8e/image/upload/e_background_removal/f_png/v1700070727/1700069859823_qsszxr.jpg"
        />
        <Menu defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Header className="flex justify-end gap-4 bg-white items-center">
          <Avatar size={50} src="https://res.cloudinary.com/dr4reow8e/image/upload/e_background_removal/f_png/v1700070727/1700069859823_qsszxr.jpg" />
          <Button icon={<LogoutOutlined />} className="bg-primary">
            Logout
          </Button>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>dashboard</Breadcrumb.Item>
            <Breadcrumb.Item>products</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            Bill is a cat.
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>©2023 nearpick</Footer>
      </Layout>
    </Layout>
  );
};

export default App;
