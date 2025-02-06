import { AddIcon } from '@chakra-ui/icons';
import { Container, HStack, IconButton } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ViewTableStudents from './ViewTableStudents';
import CreateStudent from './modal/CreateStudent';
import { LIMIT } from '@/assets/constants';
import WindowModal from '@/components/modal/WindowModal';
import Pagination from '@/components/ui/Pagination';
import SearchInput from '@/components/ui/SearchInput';
import SelectUI from '@/components/ui/SelectUI';
import useDebounce from '@/hooks/useDebounce';
import { AppDispatch, RootState } from '@/store/store';
import { getAllStudentsThunk } from '@/store/students/students.thunks';
// import NotFoundImage from '@/components/ui/not-found'

const NotFoundImage = dynamic(() => import('@/components/ui/not-found'), {
  ssr: false,
});

const SectionViewStudents = () => {
  const { data, count } = useSelector((state: RootState) => state.students);
  const t = useTranslations();
  const dispatch = useDispatch<AppDispatch>();
  const [params, setParams] = React.useState({
    page: 1,
    limit: 10,
    search: '',
  });
  const debouncedSearch = useDebounce(params.search, 500);
  const onChangePage = (page: number) => {
    setParams((prev) => ({ ...prev, page }));
  };

  const onChangeSearchInput = (value: string) => {
    setParams((prev) => ({ ...prev, search: value }));
  };

  const onClearSearchInput = () => {
    setParams((prev) => ({ ...prev, search: '' }));
  };

  const onChangeLimit = (limit: string | number) => {
    setParams((prev) => ({ ...prev, limit: +limit }));
  };

  useEffect(() => {
    dispatch(
      getAllStudentsThunk({
        limit: params.limit,
        page: params.page,
        search: debouncedSearch,
      }),
    );
  }, [dispatch, params.limit, params.page, debouncedSearch]);

  console.log(data, count);

  return (
    <Container variant={'wrapper_table'}>
      <HStack
        mb={4}
        justifyContent="space-between"
      >
        <SearchInput
          onClearSearchInput={onClearSearchInput}
          onChange={onChangeSearchInput}
          value={params.search}
          size="sm"
        />
        <WindowModal
          action={<IconButton
            aria-label="add"
            icon={<AddIcon />}
          />}
          body={(onClose) => <CreateStudent onClose={onClose} />}
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
        <ViewTableStudents students={data}/>
      )}

      <HStack
        width={'full'}
        justify={'space-between'}
      >
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
  );
};

export default SectionViewStudents;
