import CardGroup from '@/components/features/groups/current/CardGroup'
import CreateStudent from '@/components/features/students/modal/CreateStudent'
import ViewTableStudents from '@/components/features/students/ViewTableStudents'
import AppLayout from '@/components/Layout/AppLayout'
import WindowModal from '@/components/modal/WindowModal'
import BreadcrumbUI from '@/components/ui/breadcrumb'
import SearchInput from '@/components/ui/SearchInput'
import {
  getGroupOneThunk,
  getStudentsByGroupThunk,
} from '@/store/groups/groups.thunks'
import { AppDispatch, RootState } from '@/store/store'
import { Container, Heading, HStack } from '@chakra-ui/react'
import axios from 'axios'
import { GetStaticPropsContext } from 'next'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export async function getStaticPaths() {
  try {
    console.log('Start fetching groups IDs...')
    const { data: groups } = await axios.get(
      'http://localhost:5000/groups/groups.id'
    )

    if (!Array.isArray(groups) || !groups.every(g => g.id)) {
      console.error('Неправильный формат данных:', groups)
      return { paths: [], fallback: false }
    }

    const paths = groups
      .map((group: { id: number }) => [
        { params: { id: group.id.toString() }, locale: 'ru' },
        { params: { id: group.id.toString() }, locale: 'en' },
      ])
      .flat()

    return {
      paths,
      fallback: false,
    }
  } catch (error) {
    console.error('Ошибка при выполнении getStaticPaths:', error)
    return { paths: [], fallback: false }
  }
}

export async function getStaticProps({
  locale,
  params,
}: GetStaticPropsContext) {
  const { id } = params!
  if (!id) {
    console.error('ID не найден в параметрах')
    return { notFound: true }
  }

  const url = `http://localhost:5000/groups/${id}?lang=${locale}`

  try {
    const { data: group } = await axios.get(url)

    if (!group || !group.id) {
      console.error('Данные о группе отсутствуют или некорректны:', group)
      return { notFound: true }
    }

    return {
      props: {
        group,
        messages: (await import(`../../../../messages/${locale}.json`)).default,
      },
    }
  } catch (error) {
    console.error('Ошибка в getStaticProps:', error)
    return { notFound: true }
  }
}

const PageGroup = () => {
  const t = useTranslations()
  const dispatch = useDispatch<AppDispatch>()
  const { query } = useRouter()
  const { data, students } = useSelector(
    (state: RootState) => state.currentGroup
  )

  useEffect(() => {
    if (query && query.id && typeof query.id === 'string') {
      dispatch(getGroupOneThunk(query.id))
      dispatch(getStudentsByGroupThunk(query.id))
    }
  }, [query, dispatch])

  return (
    <AppLayout>
      <BreadcrumbUI options={[`${data?.groupCode}`]} />
      <Heading size={'xl'} mb={4}>
        {data?.groupCode}
      </Heading>
      <CardGroup/>
      <Container variant={'wrapper_table'}>
        <HStack justifyContent={'space-between'} mb={4}>
          <SearchInput onChange={() => {}} value={''} isDisabled/>
          <WindowModal title={t('Create')} modalBody={onClose => <CreateStudent onClose={onClose} group={data}/>} />
        </HStack>
        <ViewTableStudents students={students} />
      </Container>
    </AppLayout>
  )
}

export default PageGroup
