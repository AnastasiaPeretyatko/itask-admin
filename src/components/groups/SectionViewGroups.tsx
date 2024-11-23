import { Button, HStack, Text, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import ViewTableGroups from './ViewTableGroups'
import SearchInput from '../ui/SearchInput'
import WindowModal from '../modal/WindowModal'
import { useTranslations } from 'next-intl'
import CreateGroup from '../modal/CreateGroup'
import Pagination from '../ui/Pagination'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store/store'
import useDebounce from '@/hooks/useDebounce'
import { getGroupThunk } from '@/store/groups/createAsyncThunk.group'
import { BsPlusLg } from 'react-icons/bs'

const SectionViewGroups = () => {
  const t = useTranslations()
  const { count } = useSelector((state: RootState) => state.groups)
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
      getGroupThunk({
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
        bg={'sidebarBG'}
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
            action={
              <Button variant={'primary'} leftIcon={<BsPlusLg />}>
                {t('Create group')}
              </Button>
            }
            modalBody={onClose => <CreateGroup onClose={onClose} />}
            title={t('Create group')}
          />
        </HStack>
        <ViewTableGroups />
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

export default SectionViewGroups