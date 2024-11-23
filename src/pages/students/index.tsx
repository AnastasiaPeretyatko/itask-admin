import AppLayout from '@/components/layout/AppLayout'
import { GetStaticPropsContext } from 'next'
import BreadcrumbUI from '@/components/ui/breadcrumb'
import SectionViewStudents from '@/components/features/students/SectionViewStudents'

const StudentsPage = () => {
  return (
    <AppLayout>
      <BreadcrumbUI />
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
