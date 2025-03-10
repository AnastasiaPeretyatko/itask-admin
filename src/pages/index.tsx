import { GetStaticPropsContext } from 'next';
import AppLayout from '@/components/Layout/AppLayout';
// import { useTranslations } from 'next-intl';

export default function Index() {
  // const t = useTranslations();

  return (
    <AppLayout>Helo</AppLayout>
  );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../messages/${locale}.json`)).default,
    },
  };
}