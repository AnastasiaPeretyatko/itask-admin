import { ColorModeButton } from '@/components/ui/color-mode';
import { Box, Text } from '@chakra-ui/react';
import { GetStaticPropsContext } from 'next';
import { useTranslations } from 'next-intl';

export default function Index() {
  const t = useTranslations();

  return (
    <> </>
  );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../messages/${locale}.json`)).default
    }
  };
}