import WindowModal from '@/components/modal/WindowModal'
import ViewTableStudents from '@/components/features/students/ViewTableStudents'
import AppLayout from '@/components/layout/AppLayout'
import { AppDispatch, RootState } from '@/store/store'
import { getAllStudentsThunk } from '@/store/students/students.thunks'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
} from '@chakra-ui/react'
import { GetStaticPropsContext } from 'next'
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'
import { BsPlusLg } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import CreateStudent from '@/components/features/students/modal/CreateStudent'
import BreadcrumbUI from '@/components/ui/breadcrumb'
import SectionViewStudents from '@/components/features/students/SectionViewStudents'

const StudentsPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const students = useSelector((state: RootState) => state.students)

  useEffect(() => {
    dispatch(getAllStudentsThunk())
  }, [])

  useEffect(() => {
    console.log('students', students)
  }, [students])

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
