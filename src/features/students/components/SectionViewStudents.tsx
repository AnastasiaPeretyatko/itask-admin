import { AddIcon } from '@chakra-ui/icons'
import { HStack, IconButton, Text, VStack } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ViewTableStudents from './ViewTableStudents'
import CreateStudent from './CreateStudent'
import WindowModal from '@/components/modal/WindowModal'
import Pagination from '@/components/ui/Pagination'
import SearchInput from '@/components/ui/SearchInput'
import useDebounce from '@/hooks/useDebounce'
import { AppDispatch, RootState } from '@/store/store'
import { getAllStudentsThunk } from '@/store/students/students.thunks'
import { setSearch, setPage } from '@/store/students/student.slice'
// import NotFoundImage from '@/components/ui/not-found'

const NotFoundImage = dynamic(() => import('@/components/ui/not-found'), {
  ssr: false,
})

const SectionViewStudents = () => {
  const {
    students,
    pagination: { limit, page, search },
    count,
  } = useSelector((state: RootState) => state.students)
  const dispatch = useDispatch<AppDispatch>()

  const debouncedSearch = useDebounce(search, 500)

  const onChangePage = (page: number) => dispatch(setPage(page))

  const onChangeSearchInput = (value: string) => {
    dispatch(setSearch(value))
  }

  const onClearSearchInput = () => dispatch(setSearch(''))

  useEffect(() => {
    dispatch(getAllStudentsThunk({ limit, page, search: debouncedSearch }))
  }, [dispatch, limit, page, debouncedSearch])

  return (
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
          body={onClose => <CreateStudent onClose={onClose} />}
        />
      </HStack>
      <ViewTableStudents />
      {students.length !== 0 ? (
        <HStack width={'full'} justify={'space-between'}>
          <Text color={'text.pale'}>
            Result 1 - {students.length} of {count}
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
  )
}

export default SectionViewStudents
