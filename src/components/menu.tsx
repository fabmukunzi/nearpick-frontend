import React, { useState } from 'react';
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import Link from 'next/link';

const items: MenuProps['items'] = [
  {
    label: <Link href="/products">Products</Link>,
    key: 'products',
  },
  {
    label: <Link href="/shops">Shops</Link>,
    key: 'shops',
  },
  {
    label: <Link href="/auth/login">Login</Link>,
    key: 'login',
  },
];

const Header: React.FC = () => {
  const [current, setCurrent] = useState('mail');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    <Menu
      className="fixed w-screen z-[999] bg-primary left-0 top-0 right-0 flex justify-end px-10"
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};

export default Header;
