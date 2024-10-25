import {GetStaticPropsContext} from 'next';
import {useTranslations} from 'next-intl';

export default function Index() {
  const t = useTranslations();

  return (
    // <PageLayout title={t('title')}>
      <p>{t('Hello')}</p>
    // </PageLayout>
  );
}

export async function getStaticProps({locale}: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../messages/${locale}.json`)).default
    }
  };
}