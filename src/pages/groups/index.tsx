import AppLayout from '@/components/layout/AppLayout'
import SectionViewGroups from '@/components/groups/SectionViewGroups'
import { GetStaticPropsContext } from 'next'

const GroupsPage = () => {
  return (
    <AppLayout>
      <SectionViewGroups />
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

export default GroupsPage