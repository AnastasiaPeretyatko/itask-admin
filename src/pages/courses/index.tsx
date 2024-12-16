import CreateCourseModal from '@/components/features/courses/modal/CreateCourseModal'
import ViewTableCourse from '@/components/features/courses/ViewTableCourse'
import AppLayout from '@/components/layout/AppLayout'
import WindowModal from '@/components/modal/WindowModal'
import BreadcrumbUI from '@/components/ui/breadcrumb'
import { getCoursesThunk } from '@/store/courses/courses.thunks'
import { AppDispatch } from '@/store/store'
import { Button } from '@chakra-ui/react'
import { GetStaticPropsContext } from 'next'
import { useTranslations } from 'next-intl'
import React, { useEffect } from 'react'
import { BsPlusLg } from 'react-icons/bs'
import { useDispatch } from 'react-redux'

const CoursesPage = () => {
  const t = useTranslations()
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(getCoursesThunk())
  })

  return (
    <AppLayout>
      <BreadcrumbUI />
      <WindowModal
        modalBody={onClose => <CreateCourseModal onClose={onClose} />}
        title={'Create course'}
        action={
          <Button variant={'primary'} leftIcon={<BsPlusLg />}>
            {'Create course'}
          </Button>
        }
      />
      <ViewTableCourse />
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

export default CoursesPage
