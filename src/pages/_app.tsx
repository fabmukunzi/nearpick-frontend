import '../styles/globals.css';
import 'react-phone-number-input/style.css'
import type { AppProps } from 'next/app';
import { ConfigProvider, theme } from 'antd';
import antdTheme from '@utils/config/antdConfig';

import { Poppins } from 'next/font/google';
import AppLayout from '../layouts/appLayout';
import { Provider } from 'react-redux';
import { store } from '../store';

const roboto = Poppins({
  weight: '400',
  subsets: ['devanagari'],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider theme={antdTheme}>
      <main className={roboto.className}>
        <Provider store={store}>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
        </Provider>
      </main>
    </ConfigProvider>
  );
}
