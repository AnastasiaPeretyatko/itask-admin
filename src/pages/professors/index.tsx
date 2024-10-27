import AppLayout from '@/components/layout/AppLayout'
import CreateProfessor from '@/components/modal/CreateProfessor'
import WindowModal from '@/components/modal/WindowModal'
import ViewTableProfessor from '@/components/professors/ViewTableProfessors'
import useDebounce from '@/hooks/useDebounce'
import { getProfessorsThunk } from '@/store/professors/professors.slice'
import { AppDispatch } from '@/store/store'
import { Button, Heading, HStack, VStack } from '@chakra-ui/react'
import { GetStaticPropsContext } from 'next'
import { useTranslations } from 'next-intl'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

const ProfessorsPage = () => {
  const t = useTranslations()
  const dispatch = useDispatch<AppDispatch>()
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    search: '',
  })

  const debouncedSearch = useDebounce(params.search, 500)

  const onChangeSearchInput = (value: string) => {
    setParams(prev => ({ ...prev, search: value }))
  }

  const onClearSearchInput = () => {
    setParams(prev => ({ ...prev, search: '' }))
  }

  useEffect(() => {
    dispatch(getProfessorsThunk({ ...params, search: debouncedSearch }))
  }, [debouncedSearch, params.page, params.limit])

  return (
    <AppLayout>
      <VStack paddingX={4} mb={8}>
        <Heading size={'md'} fontWeight={500} textTransform={'uppercase'}>
          {t('Professors')}
        </Heading>
      </VStack>
      <WindowModal
        action={<Button>create</Button>}
        modalBody={onClose => <CreateProfessor onClose={onClose} />}
        title='Create professor'
      />
      <ViewTableProfessor />
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
