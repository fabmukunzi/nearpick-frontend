import React from 'react';
import { Layout, Space } from 'antd';
import HeaderComponent from '@components/menu/menu';
import Link from 'next/link';

const { Header, Footer, Content } = Layout;
type LayoutProps = {
  children: React.ReactNode;
};
const AppLayout: React.FC<LayoutProps> = ({ children }) => (
  <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
    <Layout className="bg-white md:m-page mx-auto">
      <Header className="fixed z-[999] right-0 left-0 top-0 bg-white">
        <HeaderComponent />
      </Header>
      <Content className="mt-16">{children}</Content>
      {/* <Footer className='bg-[#1b2164] fixed bottom-0'>Footer</Footer> */}
    </Layout>
    <Footer className="relative right-0 left-0 bottom-0">
      <div className="mx-auto w-full max-w-screen-xl">
        <div className="grid grid-cols-2 gap-8 px-4 py-6 lg:py-8 md:grid-cols-4">
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
              Company
            </h2>
            <ul className="font-medium">
              <li className="mb-4">
                <a href="#" className=" hover:underline">
                  About
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Brand Center
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Blog
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold uppercase">
              Help center
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
                <Link href="/contact">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
              Legal
            </h2>
            <ul className="text-gray-500 font-medium">
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Terms &amp; Conditions
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
              Download
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
        <div className="px-4 py-6 bg-primary">
          <span className="text-center">© 2023. All Rights Reserved.</span>
        </div>
      </div>
    </Footer>
  </Space>
);

export default AppLayout;
