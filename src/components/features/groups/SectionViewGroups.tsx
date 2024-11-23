import { Container, HStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store/store'
import useDebounce from '@/hooks/useDebounce'
import { getGroupThunk } from '@/store/groups/groups.thunks'
import SearchInput from '@/components/ui/SearchInput'
import WindowModal from '@/components/modal/WindowModal'
import CreateGroup from './modal/CreateGroup'
import ViewTableGroups from './ViewTableGroups'
import Pagination from '@/components/ui/Pagination'
import dynamic from 'next/dynamic'
import { LIMIT } from '@/assets/constants'
import SelectUI from '@/components/ui/SelectUI'

const NotFoundImage = dynamic(() => import('@/components/ui/not-found'), {
  ssr: false,
})

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

  const onChangeLimit = (limit: string | number) => {
    setParams(prev => ({ ...prev, limit: +limit }))
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
            modalBody={onClose => <CreateGroup onClose={onClose} />}
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
          <ViewTableGroups />
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
    </>
  )
}

export default SectionViewGroups
