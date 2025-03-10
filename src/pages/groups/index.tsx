import { GetStaticPropsContext } from 'next';
import AppLayout from '@/components/Layout/AppLayout';
import SectionViewGroups from '@/features/groups/components/SectionViewGroups';

const GroupsPage = () => {
  return (
    <AppLayout>
      {/* <BreadcrumbUI /> */}
      <SectionViewGroups />
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

export default GroupsPage;
