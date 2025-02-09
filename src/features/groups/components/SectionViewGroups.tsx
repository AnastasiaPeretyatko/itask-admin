import { HStack, IconButton, Text, VStack } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store/store'
import useDebounce from '@/hooks/useDebounce'
import { getGroupsThunk } from '@/store/groups/groups.thunks'
import SearchInput from '@/components/ui/SearchInput'
import WindowModal from '@/components/modal/WindowModal'
import ViewTableGroups from './ViewTableGroups'
import Pagination from '@/components/ui/Pagination'
import dynamic from 'next/dynamic'
import { createGroup } from '@/actions/definitions/groups'
import { AddIcon } from '@chakra-ui/icons'
import { setSearch } from '@/store/groups/groups.slice'
import { setPage } from '@/store/professors/professors.slice'

const NotFoundImage = dynamic(() => import('@/components/ui/not-found'), {
  ssr: false,
})

const SectionViewGroups = () => {
  const {
    groups,
    count,
    pagination: { page, limit, search },
  } = useSelector((state: RootState) => state.groups)
  const dispatch = useDispatch<AppDispatch>()

  const debouncedSearch = useDebounce(search, 500)

  const onChangeSearchInput = (value: string) => {
    dispatch(setSearch(value))
  }

  const onClearSearchInput = () => dispatch(setSearch(''))

  const onChangePage = (page: number) => {
    dispatch(setPage(page))
  }

  useEffect(() => {
    dispatch(getGroupsThunk({ limit, page, search: debouncedSearch }))
  }, [debouncedSearch, page, limit, dispatch])

  return (
    <>
      <VStack width={'full'} borderRadius={'10px'} gap={4}>
        <HStack width={'full'} justify={'space-between'}>
          <SearchInput
            onClearSearchInput={onClearSearchInput}
            onChange={onChangeSearchInput}
            value={search || ''}
            size="sm"
          />
          <WindowModal
            action={<IconButton aria-label="add" icon={<AddIcon />} />}
            body={onClose => createGroup.children(onClose).content}
          />
        </HStack>
        <ViewTableGroups />
        {groups.length !== 0 ? (
          <HStack width={'full'} justify={'space-between'}>
            <Text color={'text.pale'}>
              Result 1 - {groups.length} of {count}
            </Text>
            <Pagination
              count={count}
              page={page}
              limit={limit}
              onChangePage={onChangePage}
            />
          </HStack>
        ) : null}
      </VStack>
    </>
  )
}

export default SectionViewGroups
