import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { NextIntlClientProvider } from 'next-intl';
import { Provider } from 'react-redux';
import ErrorBoundary from '@/components/ErrorBoundary';
import { store } from '@/store/store';
import { theme } from '@/style/theme';

import '@/style/global.css';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <NextIntlClientProvider
      locale={router.locale}
      messages={pageProps.messages}
    >
      <Provider store={store}>
        <ChakraProvider
          resetCSS
          theme={theme}
        >
          <Head>
            <title>ITASK</title>
          </Head>
          <ErrorBoundary>
            <Component {...pageProps} />
          </ErrorBoundary>
        </ChakraProvider>
      </Provider>
    </NextIntlClientProvider>
  );
}
