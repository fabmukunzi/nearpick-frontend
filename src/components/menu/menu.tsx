import React, { Fragment, useState } from 'react';
import { Avatar, Badge, Drawer, Image, Input, Modal, Typography } from 'antd';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import {
  DashboardOutlined,
  MenuOutlined,
  SearchOutlined,
  ShoppingFilled,
  UserOutlined,
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { RootState } from '@store/index';
import { useRouter } from 'next/router';
import { useGetCartQuery } from '@store/actions/cart';
import useDisclose from '@utils/hooks/useDisclose';

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
  const { Text } = Typography;
  const { user } = useSelector((state: RootState) => state.userReducer);
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
  if (user?.role === 'seller') location.href = '/dashboard/products';
  const currentTab = useRouter().route;
  const { data, isLoading } = useGetCartQuery(undefined, { skip: !user });
  const { close, isOpen, toggle } = useDisclose();
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
      <div className="flex items-center h-[inherit] justify-between bg-white">
        <Link
          href="/"
          className="mt-1 w-1/4 flex flex-col items-center justify-center"
        >
          <Image
            preview={false}
            className="h-8 mt-2 w-16 object-cover revert"
            alt="logo"
            src="https://res.cloudinary.com/dr4reow8e/image/upload/e_background_removal/f_png/v1700070727/1700069859823_qsszxr.jpg"
          />
          <Image
            preview={false}
            className="h-10 w-32 object-cover revert"
            alt="logo"
            src="https://res.cloudinary.com/dr4reow8e/image/upload/v1703227669/izimart-logo-removebg-preview_qcjnzw.png"
          />
        </Link>
        <div className="md:flex hidden md:gap-10 gap-3">
          {items.map((item) => (
            <Fragment key={item.key}>{item?.label}</Fragment>
          ))}
        </div>
        <Drawer className="block md:hidden" open={isOpen} onClose={close}>
          <div className="flex flex-col md:gap-10 gap-3">
            {items.map((item) => (
              <div onClick={toggle} key={item.key}>
                {item?.label}
              </div>
            ))}
          </div>
        </Drawer>

        <div className="flex justify-center items-center md:gap-6 gap-4 w-1/4">
          {/* <Link href="/profile"> */}
          <SearchOutlined
            onClick={showModal}
            className="text-lg cursor-pointer"
          />
          {user ? (
            <Link href="/profile">
              <Avatar
                size={20}
                shape="circle"
                src={user.avatar || ''}
                className="text-lg border-primary -mt-1"
              />
            </Link>
          ) : (
            <Link href="/auth/login">
              <UserOutlined className="text-lg" />
            </Link>
          )}
          <Link
            href="/cart"
            className={`${
              currentTab === 'cart'
                ? 'bg-primary hover:text-white'
                : 'bg-white text-primary border-primary'
            }`}
          >
            <Badge
              count={data?.products.length || 0}
              showZero
              size="small"
              color="#00b012"
              style={{ backgroundColor: '#64B937' }}
            >
              <ShoppingFilled className="text-xl" />
            </Badge>
          </Link>
          {user?.role == 'admin' && (
            <Link href="/dashboard/products">
              <DashboardOutlined className="text-lg" />
            </Link>
          )}
          <MenuOutlined className="block md:hidden" onClick={toggle} />
        </div>
      </div>
    </Fragment>
  );
};

export default Header;
