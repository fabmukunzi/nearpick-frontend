import React, { Fragment, useContext, useState } from 'react';
import {
  Avatar,
  Badge,
  Drawer,
  Image,
  Input,
  Modal,
  Select,
  Typography,
} from 'antd';
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
import { useProfileQuery } from '@store/actions/auth';
import { currencies } from '@utils/currency';
import { AppContext } from '@pages/_app';
import { useTranslation } from 'react-i18next';

const Header: React.FC = () => {
  const user = useSelector((state: RootState) => state.userReducer.user);
  // const { data: userProfile, isLoading: loadingProfile } = useProfileQuery();
  // const user = userProfile?.user;
  const [activeItem, setActiveItem] = useState<string>('home');
  const { t, i18n } = useTranslation();
  const items = [
    {
      label: (
        <Link
          href="/"
          className={`text-base ${activeItem === 'home' ? 'text-primary' : ''}`}
        >
          {t('home')}
        </Link>
      ),
      key: 'home',
    },
    {
      label: (
        <Link
          href="/products"
          className={`text-base ${
            activeItem === 'products' ? 'text-primary' : ''
          }`}
        >
          {t('products')}
        </Link>
      ),
      key: 'products',
    },
    {
      label: (
        <Link
          href="/shops"
          className={`text-base ${
            activeItem === 'shops' ? 'text-primary' : ''
          }`}
        >
          {t('shops')}
        </Link>
      ),
      key: 'shops',
    },
    {
      label: (
        <Link
          href="/contact"
          className={`text-base ${
            activeItem === 'contact' ? 'text-primary' : ''
          }`}
        >
          {t('contact')}
        </Link>
      ),
      key: 'contact',
    },
  ];
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
  const { currency, setCurrency } = useContext(AppContext);
  const languages = [
    { locale: 'en', name: 'English' },
    { locale: 'fr', name: 'French' },
    { locale: 'kin', name: 'Kinyarwanda' },
  ];
  return (
    <div className="fixed right-0 left-0 top-0">
      <div className="w-full h-10 bg-primary flex justify-around items-center">
        <div className="text-white">
          Call us :
          <Link className="text-white" href={`tel:${+250780403244}`}>
            +250780403244
          </Link>
        </div>
        <div className="flex gap-3">
          <Select
            showSearch
            defaultValue="RWF"
            className="bg-primary md:w-20 w-20"
            onChange={(value: string) => {
              setCurrency(value);
            }}
            options={currencies.map((currency) => {
              return {
                label: currency.code,
                value: currency.code,
              };
            })}
          />
          <Select
            defaultValue="en"
            className="bg-primary md:w-28 w-28"
            onChange={(value: string) => {
              i18n.changeLanguage(value);
            }}
            options={languages.map((currency) => {
              return {
                label: currency.name,
                value: currency.locale,
              };
            })}
          />
        </div>
      </div>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        footer={false}
        onCancel={handleCancel}
      >
        <Input.Search
          className="mt-6 h-72 w-full"
          placeholder="what are you looking for?"
        />
      </Modal>
      <div className="flex h-16 justify-around items-center bg-white">
        <Link
          href="/"
          className="mt-1 flex flex-col items-center justify-center"
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
        <div className="md:flex hidden md:gap-8 gap-3">
          {items.map((item) => (
            <p onClick={() => setActiveItem(item.key)} key={item.key}>
              {item?.label}
            </p>
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

        <div className="flex justify-center items-center md:gap-6 gap-4">
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
    </div>
  );
};

export default Header;
