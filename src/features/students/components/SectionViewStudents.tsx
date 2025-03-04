import { AddIcon } from '@chakra-ui/icons';
import { Container, Heading, HStack, IconButton, Text, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreateStudent from './CreateStudent';
import ViewTableStudents from './ViewTableStudents';
import WindowModal from '@/components/modal/WindowModal';
import Pagination from '@/components/ui/Pagination';
import SearchInput from '@/components/ui/SearchInput';
import useDebounce from '@/hooks/useDebounce';
import { AppDispatch, RootState } from '@/store/store';
import { setSearch, setPage } from '@/store/students/student.slice';
import { getAllStudentsThunk } from '@/store/students/students.thunks';

const SectionViewStudents = () => {
  const {
    students,
    pagination: { limit, page, search },
    count,
  } = useSelector((state: RootState) => state.students);
  const dispatch = useDispatch<AppDispatch>();

  const debouncedSearch = useDebounce(search, 500);

  const onChangePage = (page: number) => dispatch(setPage(page));

  const onChangeSearchInput = (value: string) => {
    dispatch(setSearch(value));
  };

  const onClearSearchInput = () => dispatch(setSearch(''));

  useEffect(() => {
    dispatch(getAllStudentsThunk({ limit, page, search: debouncedSearch }));
  }, [dispatch, limit, page, debouncedSearch]);

  if (students.length === 0) {
    return (
      <Container
        textAlign={'center'}
        height={'100%'}
      >
        <VStack
          gap={2}
          mb={4}
        >
          <Heading size={'md'}>No groups</Heading>
          <Text>You have no groups</Text>
        </VStack>
        <WindowModal
          title={('Create group')}
          body={(onClose) => <CreateStudent onClose={onClose} />}
        />
      </Container>
    );
  }

  return (
    <VStack
      width={'full'}
      borderRadius={'10px'}
      gap={4}
    >
      <HStack
        width={'full'}
        justify={'space-between'}
      >
        <SearchInput
          onClearSearchInput={onClearSearchInput}
          onChange={onChangeSearchInput}
          value={search || ''}
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
      <ViewTableStudents />
      {students.length !== 0 ? (
        <HStack
          width={'full'}
          justify={'space-between'}
        >
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
  );
};

export default SectionViewStudents;
