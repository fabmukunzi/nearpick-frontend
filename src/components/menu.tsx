import React, { Fragment, useState } from 'react';
// import {
//   AppstoreOutlined,
//   MailOutlined,
//   SettingOutlined,
// } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Avatar, Badge, Image, Input, Menu, Modal } from 'antd';
import Link from 'next/link';
import {
  SearchOutlined,
  ShoppingFilled,
  UserOutlined,
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { RootState } from '@store/index';
import { useRouter } from 'next/router';
import { useGetCartQuery } from '@store/actions/cart';

const items = [
  {
    label: (
      <Link href="/" className="text-base">
        Home
      </Link>
    ),
    key: 'home',
  },
  {
    label: (
      <Link href="/products" className="text-base">
        Products
      </Link>
    ),
    key: 'products',
  },
  {
    label: (
      <Link href="/shops" className="text-base">
        Shops
      </Link>
    ),
    key: 'shops',
  },
  {
    label: (
      <Link href="/contact" className="text-base">
        Contact us
      </Link>
    ),
    key: 'login',
  },
];

const Header: React.FC = () => {
  const [current, setCurrent] = useState('mail');
  const { user } = useSelector((state: RootState) => state.userReducer);
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
const currentTab=useRouter().route;
console.log(currentTab)
const { data, isLoading } = useGetCartQuery();
  return (
    <Fragment>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        footer={false}
        onCancel={handleCancel}
      >
        <Input.Search
          className="h-14 mt-6"
          placeholder="what are you looking for?"
        />
      </Modal>
      <div className="flex items-center justify-between bg-white">
        <Link
          href="/"
          className="mt-1 w-1/4 flex flex-col items-center justify-center"
        >
          <Image
            preview={false}
            className="h-8 w-16 object-cover revert"
            alt="logo"
            src="https://res.cloudinary.com/dr4reow8e/image/upload/e_background_removal/f_png/v1700070727/1700069859823_qsszxr.jpg"
          />
          <Image
            preview={false}
            className="h-10 w-32 object-cover -mt-2 revert"
            alt="logo"
            src="https://res.cloudinary.com/dr4reow8e/image/upload/v1700073382/1700070120057-removebg-preview_mqxw0l.png"
          />
        </Link>
        <div className="flex gap-10">
          {items.map((item) => (
            <Fragment key={item.key}>{item?.label}</Fragment>
          ))}
        </div>

        <div className="flex items-center gap-6 w-1/4">
          {/* <Link href="/profile"> */}
          <SearchOutlined
            onClick={showModal}
            className="text-lg cursor-pointer"
          />
          {/* {user ? (
            <Link href="/profile">
              <UserOutlined className="text-lg" />
              {/* <Avatar size={20} src={user.avatar} className="text-lg" /> */}
          {/* </Link>
          ) : ( */}
          <Link href="/auth/login">
            <UserOutlined className="text-lg" />
          </Link>
          {/* )} */}
          <Link href="/cart" className={`${
              currentTab === 'cart'
                ? 'bg-primary hover:text-white'
                : 'bg-white text-primary border-primary'
            }`}>
            <Badge
              count={data?.products.length}
              showZero
              size="small"
              color="green"
              style={{ backgroundColor: '#64B937' }}
            >
              <ShoppingFilled className="text-xl" />
            </Badge>
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default Header;
