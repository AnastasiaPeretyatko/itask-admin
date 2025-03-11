import { GetStaticPropsContext } from 'next';
import AppLayout from '@/components/Layout/AppLayout';
import SectionViewProfessors from '@/features/professors/components/SectionViewProfessors';

const ProfessorsPage = () => {
  return (
    <AppLayout>
      <SectionViewProfessors />
    </AppLayout>
  );
};

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../../messages/${locale}.json`)).default,
    },
  };
}

export default ProfessorsPage;
