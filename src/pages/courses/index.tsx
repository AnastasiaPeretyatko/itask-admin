import { GetStaticPropsContext } from 'next';
import AppLayout from '@/components/Layout/AppLayout';
import SectionViewCourses from '@/features/courses/components/SectionViewCourses';

const CoursesPage = () => {
  return (
    <AppLayout>
      <SectionViewCourses/>
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


export default CoursesPage;
