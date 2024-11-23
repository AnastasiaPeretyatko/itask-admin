import SectionViewProfessors from '@/components/features/professors/SectionViewProfessors'
import AppLayout from '@/components/layout/AppLayout'
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
