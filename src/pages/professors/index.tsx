import AppLayout from '@/components/layout/AppLayout'
import SectionViewProfessors from '@/components/professors/SectionViewProfessors'
import { GetStaticPropsContext } from 'next'

const ProfessorsPage = () => {
  return (
    <AppLayout>
      <SectionViewProfessors />
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

export default ProfessorsPage
