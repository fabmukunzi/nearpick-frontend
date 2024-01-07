import React, { useEffect, useState } from 'react';
import {
  AppstoreOutlined,
  LogoutOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Avatar, Breadcrumb, Button, Layout, Menu, theme } from 'antd';
import { useRouter } from 'next/router';
import { logout } from '@store/reducers/users';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/index';

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

const sellerItems: MenuItem[] = [
  // getItem('Analytics', '1', <AppstoreOutlined className="text-xl mx-1" />),
  getItem('Products', '2', <ShoppingOutlined className="text-xl mx-1" />),
  getItem('Stores', '3', <ShopOutlined className="text-xl mx-1" />),
  getItem('Sales', '5', <ShoppingCartOutlined className="text-xl mx-1" />),
];
const adminItems: MenuItem[] = [
  // getItem('Analytics', '1', <AppstoreOutlined className="text-xl mx-1" />),
  getItem('Products', '2', <ShoppingOutlined className="text-xl mx-1" />),
  getItem('Stores', '3', <ShopOutlined className="text-xl mx-1" />),
  getItem('Sales', '5', <ShoppingCartOutlined className="text-xl mx-1" />),
  getItem('Users', '4', <UserOutlined className="text-xl mx-1" />),
];
const routes = [
  // { path: 'analytics', key: '1' },
  { path: 'products', key: '2' },
  { path: 'stores', key: '3' },
  { path: 'users', key: '4' },
  { path: 'sales', key: '5' },
];
interface Props {
  children: React.ReactNode;
}
const DashboardLayout: React.FC<Props> = ({ children }) => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { route, push } = useRouter();
  const defaultSelectedKey =
    routes.find((r) => r.path === route?.split('/')[2])?.key || '';
  const handleItemClick = (item: MenuItem) => {
    routes.map((route) =>
      item?.key === route.key ? push(`${route.path}`) : ''
    );
  };
  if (user?.role === 'buyer') location.href = '/';
  // useEffect(() => {
  //   if (user?.role === 'admin') {
  //     items.push(
  //       getItem('Users', '4', <UserOutlined className="text-xl mx-1" />)
  //     );
  //   } else if (user?.role === 'buyer') location.href = '/';
  // }, []);
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        theme="light"
        className="bg-slate-100"
        breakpoint="lg"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Avatar
          className="flex mx-auto mb-10"
          size={collapsed ? 50 : 80}
          src="https://res.cloudinary.com/dr4reow8e/image/upload/e_background_removal/f_png/v1700070727/1700069859823_qsszxr.jpg"
        />
        <Menu
          onClick={handleItemClick}
          className="bg-slate-100"
          defaultSelectedKeys={[defaultSelectedKey]}
          mode="inline"
          items={user?.role === 'admin' ? adminItems : sellerItems}
        />
      </Sider>
      <Layout>
        <Header className="flex justify-end gap-4 bg-slate-100 items-center">
          <Avatar
            onClick={() => push('/dashboard/profile')}
            className="rounded-full border-primary cursor-pointer"
            size={35}
            src={user?.avatar}
          />
          <Button
            onClick={() => {
              dispatch(logout());
              push('/');
            }}
            icon={<LogoutOutlined />}
            className="bg-primary"
          >
            Logout
          </Button>
        </Header>
        <Content className="min-h-screen">{children}</Content>
        <Footer style={{ textAlign: 'center' }}>
          ©{new Date().getFullYear()} Roline Services Ltd.
        </Footer>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
