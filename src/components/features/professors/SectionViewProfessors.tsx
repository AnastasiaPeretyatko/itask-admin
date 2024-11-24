import { HStack, Text, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store/store'
import useDebounce from '@/hooks/useDebounce'
import { getProfessorsThunk } from '@/store/professors/professors.thunks'
import SearchInput from '@/components/ui/SearchInput'
import WindowModal from '@/components/modal/WindowModal'
import CreateProfessor from './modal/CreateProfessor'
import Pagination from '@/components/ui/Pagination'
import ViewTableProfessor from './ViewTableProfessors'

const SectionViewProfessors = () => {
  const t = useTranslations()
  const { count } = useSelector((state: RootState) => state.professors)
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

  const onChangePage = (page: number) => {
    setParams(prev => ({ ...prev, page }))
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
    <>
      <VStack
        width={'full'}
        borderRadius={'10px'}
        bg={'background.main'}
        padding={4}
        gap={4}
      >
        <HStack width={'full'} justify={'space-between'}>
          <SearchInput
            onChange={onChangeSearchInput}
            value={params.search}
            onClearSearchInput={onClearSearchInput}
          />
          <WindowModal
            modalBody={onClose => <CreateProfessor onClose={onClose} />}
            title={t('Create professor')}
          />
        </HStack>
        <ViewTableProfessor />
        <HStack width={'full'} justify={'space-between'}>
          <Text color={'text.pale'}>Result 1 - 15 of {count}</Text>
          <Pagination
            count={count}
            page={params.page}
            limit={params.limit}
            onChangePage={onChangePage}
          />
        </HStack>
      </VStack>
    </>
  )
}

export default SectionViewProfessors
