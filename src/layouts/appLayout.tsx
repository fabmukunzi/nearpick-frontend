import React from 'react';
import { Layout, Space, Typography } from 'antd';
import HeaderComponent from '@components/menu/menu';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const { Header, Footer, Content } = Layout;
type LayoutProps = {
  children: React.ReactNode;
};
const AppLayout: React.FC<LayoutProps> = ({ children }) => {
  const { Text } = Typography;
  const { t, i18n } = useTranslation();
  return (
    <Space className="bg-white w-[100%]" direction="vertical" size={[0, 48]}>
      <Layout>
        <Header className="z-[1]">
          <HeaderComponent />
        </Header>
        <Content className="min-h-[50%] mt-10 bg-white">{children}</Content>
        <Footer className="bg-white">
          <div className="mx-auto w-full max-w-screen-xl">
            <div className="grid grid-cols-2 gap-8 px-4 md:grid-cols-4">
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
                  {t('company')}
                </h2>
                <ul className="font-medium">
                  <li className="mb-4">
                    <a href="#" className=" hover:underline">
                      {t('about')}
                    </a>
                  </li>
                  <li className="mb-4">
                    <a href="#" className="hover:underline">
                      {t('brandCenter')}
                    </a>
                  </li>
                  <li className="mb-4">
                    <a href="#" className="hover:underline">
                      {t('blog')}
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-semibold uppercase">
                  {t('helpCenter')}
                </h2>
                <ul className="text-gray-500 font-medium">
                  <li className="mb-4">
                    <a href="#" className="hover:underline">
                      Twitter
                    </a>
                  </li>
                  <li className="mb-4">
                    <a href="#" className="hover:underline">
                      Facebook
                    </a>
                  </li>
                  <li className="mb-4">
                    <Link href="/contact">{t('contact')}</Link>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
                  {t('legal')}
                </h2>
                <ul className="text-gray-500 font-medium">
                  <li className="mb-4">
                    <a href="#" className="hover:underline">
                      {t('privacyPolicy')}
                    </a>
                  </li>
                  <li className="mb-4">
                    <a href="#" className="hover:underline">
                      {t('terms')}
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
                  {t('download')}
                </h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                  <li className="mb-4">
                    <a href="#" className="hover:underline">
                      iOS
                    </a>
                  </li>
                  <li className="mb-4">
                    <a href="#" className="hover:underline">
                      Android
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="py-6 bg-primary text-center">
              <Text className="text-center font-semibold text-white">
                &copy; {new Date().getFullYear()}. Roline Services Ltd.
              </Text>
            </div>
          </div>
        </Footer>
      </Layout>
    </Space>
  );
};

export default AppLayout;
