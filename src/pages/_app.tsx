import '../styles/globals.css';
import 'react-phone-number-input/style.css';
import type { AppProps } from 'next/app';
import { ConfigProvider, theme } from 'antd';
import antdTheme from '@utils/config/antdConfig';

import { Poppins } from 'next/font/google';
import AppLayout from '../layouts/appLayout';
import { Provider } from 'react-redux';
import { store } from '../store';
import { useRouter } from 'next/router';
import DashboardLayout from '@layout/dashboardLayout';
import { createContext, useState } from 'react';

const roboto = Poppins({
  weight: '400',
  subsets: ['devanagari'],
});
export const AppContext = createContext({
  currency: 'RWF',
  setCurrency: (currency: string) => {},
});
export default function App({ Component, pageProps }: AppProps) {
  const { route } = useRouter();
  const [currency, setCurrency] = useState('RWF');
  const Layout =
    route?.split('/')[1] === 'dashboard' ? DashboardLayout : AppLayout;
  return (
    <ConfigProvider theme={antdTheme}>
      <main className={roboto.className}>
        <AppContext.Provider value={{ currency, setCurrency }}>
          <Provider store={store}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </Provider>
        </AppContext.Provider>
      </main>
    </ConfigProvider>
  );
}
