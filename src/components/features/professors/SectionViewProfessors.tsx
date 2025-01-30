import { HStack, IconButton, Text, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
// import { useTranslations } from 'next-intl'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store/store'
import useDebounce from '@/hooks/useDebounce'
import { getProfessorsThunk } from '@/store/professors/professors.thunks'
import SearchInput from '@/components/ui/SearchInput'
import WindowModal from '@/components/modal/WindowModal'
import CreateProfessor from './modal/CreateProfessor'
import ViewTableProfessor from './ViewTableProfessors'
import { AddIcon, ArrowForwardIcon } from '@chakra-ui/icons'

const SectionViewProfessors = () => {
  // const t = useTranslations()
  const { data, count } = useSelector((state: RootState) => state.professors)
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

  // const onChangePage = (page: number) => {
  //   setParams(prev => ({ ...prev, page }))
  // }

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
        padding={4}
        gap={4}
      >
        <HStack width={'full'} justify={'space-between'}>
          <SearchInput
            value={params.search}
            placeholder="Search by name or email..."
            onChange={onChangeSearchInput}
            onClearSearchInput={onClearSearchInput}
          />
          <WindowModal
            action={
              <IconButton aria-label="add" size={'sm'} icon={<AddIcon />} />
            }
          >
            {onClose => <CreateProfessor onClose={onClose} />}
          </WindowModal>
        </HStack>
        <ViewTableProfessor />
        <HStack width={'full'} justify={'space-between'}>
          <Text color={'text.pale'}>
            Result 1 - {data.length} of {count}
          </Text>
          {params.page !== Math.ceil(count / params.limit) && (
            <HStack>
              <Text color={'text.pale'}>
                {params.page} of {Math.ceil(count / params.limit)}
              </Text>{' '}
              <ArrowForwardIcon />
            </HStack>
          )}
        </HStack>
      </VStack>
    </>
  )
}

export default SectionViewProfessors
