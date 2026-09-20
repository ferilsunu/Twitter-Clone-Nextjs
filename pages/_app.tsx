import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast';
import { SessionProvider } from 'next-auth/react';
import { useEffect } from 'react';

import Layout from '@/components/Layout'
import LoginModal from '@/components/modals/LoginModal'
import RegisterModal from '@/components/modals/RegisterModal'
import EditModal from '@/components/modals/EditModal';
import useTheme from '@/hooks/useTheme';
import '@/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  const initTheme = useTheme((state) => state.initTheme);

  useEffect(() => {
    initTheme();
  }, [initTheme]);

  return (
    <SessionProvider session={pageProps.session}>
      <Toaster />
      <RegisterModal />
      <LoginModal />
      <EditModal />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )
}
