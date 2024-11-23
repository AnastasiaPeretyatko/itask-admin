import { Container, HStack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import ViewTableStudents from './ViewTableStudents'
import SearchInput from '@/components/ui/SearchInput'
import WindowModal from '@/components/modal/WindowModal'
import CreateStudent from './modal/CreateStudent'
import { useTranslations } from 'next-intl'
import Pagination from '@/components/ui/Pagination'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store/store'
import { getAllStudentsThunk } from '@/store/students/students.thunks'
import useDebounce from '@/hooks/useDebounce'
import SelectUI from '@/components/ui/SelectUI'
import { LIMIT } from '@/assets/constants'
// import NotFoundImage from '@/components/ui/not-found'
import dynamic from 'next/dynamic'

const NotFoundImage = dynamic(() => import('@/components/ui/not-found'), {
  ssr: false,
})

const SectionViewStudents = () => {
  const { count } = useSelector((state: RootState) => state.students)
  const t = useTranslations()
  const dispatch = useDispatch<AppDispatch>()
  const [params, setParams] = React.useState({
    page: 1,
    limit: 10,
    search: '',
  })
  const debouncedSearch = useDebounce(params.search, 500)
  const onChangePage = (page: number) => {
    setParams(prev => ({ ...prev, page }))
  }

  const onChangeSearchInput = (value: string) => {
    setParams(prev => ({ ...prev, search: value }))
  }

  const onClearSearchInput = () => {
    setParams(prev => ({ ...prev, search: '' }))
  }

  const onChangeLimit = (limit: string | number) => {
    setParams(prev => ({ ...prev, limit: +limit }))
  }

  useEffect(() => {
    dispatch(
      getAllStudentsThunk({
        limit: params.limit,
        page: params.page,
        search: debouncedSearch,
      })
    )
  }, [dispatch, params.limit, params.page, debouncedSearch])

  return (
    <Container variant={'wrapper_table'}>
      <HStack mb={4} justifyContent="space-between">
        <SearchInput
          onClearSearchInput={onClearSearchInput}
          onChange={onChangeSearchInput}
          value={params.search}
          size="sm"
        />
        <WindowModal
          title={t('Create student')}
          modalBody={onClose => <CreateStudent onClose={onClose} />}
        />
      </HStack>
      {!count ? (
        <Container
          width={'full'}
          height={'full'}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
          m={0}
        >
          <NotFoundImage />
        </Container>
      ) : (
        <ViewTableStudents />
      )}

      <HStack width={'full'} justify={'space-between'}>
        <SelectUI
          size={20}
          array={LIMIT}
          onChangeValue={onChangeLimit}
          currentValue={params.limit}
          isDisabled={!count}
        />
        <Pagination
          count={count}
          page={params.page}
          limit={params.limit}
          onChangePage={onChangePage}
        />
      </HStack>
    </Container>
  )
}

export default SectionViewStudents
