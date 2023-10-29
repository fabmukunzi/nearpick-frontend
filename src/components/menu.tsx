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
      label: <Link href="/auth/login">Login</Link>,
      key: 'mail',
      icon: <MailOutlined />,
    },
  //   {
  //     label: 'Navigation Two',
  //     key: 'app',
  //     icon: <AppstoreOutlined />,
  //     disabled: true,
  //   },
];

const Header: React.FC = () => {
  const [current, setCurrent] = useState('mail');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};

export default Header;
