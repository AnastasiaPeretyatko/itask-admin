import { Provider } from '@/components/ui/provider';
import { ChakraProvider } from '@chakra-ui/react';
import { NextIntlClientProvider } from 'next-intl';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import {system} from '@/style/theme'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <NextIntlClientProvider
      locale={router.locale}
      messages={pageProps.messages}
    >
      <Provider>
        <Component {...pageProps} />
      </Provider>
    </NextIntlClientProvider>
  );
}