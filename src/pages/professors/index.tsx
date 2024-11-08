import Header from '@/components/header'
import AppLayout from '@/components/layout/AppLayout'
import CreateProfessor from '@/components/modal/CreateProfessor'
import WindowModal from '@/components/modal/WindowModal'
import ViewTableProfessor from '@/components/professors/ViewTableProfessors'
import useDebounce from '@/hooks/useDebounce'
import { getProfessorsThunk } from '@/store/professors/createAsyncThunk.professor'
import { AppDispatch } from '@/store/store'
import { Button, HStack, VStack } from '@chakra-ui/react'
import { GetStaticPropsContext } from 'next'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
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
    dispatch(
      getProfessorsThunk({
        limit: params.limit,
        page: params.page,
        search: debouncedSearch,
      })
    )
  }, [debouncedSearch, params.page, params.limit, dispatch])

  return (
    <AppLayout>
      <Header
        onChange={onChangeSearchInput}
        value={params.search}
        onClearSearchInput={onClearSearchInput}
      />
      <VStack width={'full'} gap={6} paddingX={6}>
        <HStack width={'full'} justify={'space-between'}>
          <WindowModal
            action={<Button variant={'primary'}>{t('Create professor')}</Button>}
            modalBody={onClose => <CreateProfessor onClose={onClose} />}
            title={t("Create professor")}
          />
        </HStack>
        <ViewTableProfessor />
      </VStack>
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
