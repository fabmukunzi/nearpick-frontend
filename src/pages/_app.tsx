import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ConfigProvider, theme } from 'antd';
import { Inter } from 'next/font/google';
import antdTheme from '@/utils/config/antdConfig';

import { Roboto } from 'next/font/google';
import AppLayout from '@/layouts/appLayout';

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider theme={antdTheme}>
      <main className={roboto.className}>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </main>
    </ConfigProvider>
  );
}
