import SectionViewGroups from '@/components/features/groups/SectionViewGroups'
import AppLayout from '@/components/Layout/AppLayout'
import BreadcrumbUI from '@/components/ui/breadcrumb'
import { GetStaticPropsContext } from 'next'

const GroupsPage = () => {
  return (
    <AppLayout>
      <BreadcrumbUI />
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
