import AppLayout from '@/components/Layout/AppLayout'
import { GetStaticPropsContext } from 'next'
// import BreadcrumbUI from '@/components/ui/breadcrumb'
import SectionViewStudents from '@/features/students/components/SectionViewStudents'

const StudentsPage = () => {
  return (
    <AppLayout>
      {/* <BreadcrumbUI /> */}
      <SectionViewStudents />
    </AppLayout>
  )
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../../messages/${locale}.json`)).default,
    },
  }
}

export default StudentsPage
