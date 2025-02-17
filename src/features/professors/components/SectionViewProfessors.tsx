import { AddIcon } from '@chakra-ui/icons';
import { HStack, IconButton, Text, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ViewTableProfessor from './ViewTableProfessors';
import { addProfessor } from '@/actions/definitions/professors';
import WindowModal from '@/components/modal/WindowModal';
import Pagination from '@/components/ui/Pagination';
import SearchInput from '@/components/ui/SearchInput';
import useDebounce from '@/hooks/useDebounce';
import { setPage, setSearch } from '@/store/professors/professors.slice';
import { getProfessorsThunk } from '@/store/professors/professors.thunks';
import { AppDispatch, RootState } from '@/store/store';

const SectionViewProfessors = () => {
  const {
    pagination: { page, limit, search },
    professors,
    count,
  } = useSelector((state: RootState) => state.professors);
  const dispatch = useDispatch<AppDispatch>();

  const debouncedSearch = useDebounce(search, 500);

  const onChangeSearchInput = (value: string) => {
    dispatch(setSearch(value));
  };

  const onClearSearchInput = () => {
    dispatch(setSearch(''));
  };

  const onChangePage = (page: number) => {
    dispatch(setPage(page));
  };

  useEffect(() => {
    dispatch(getProfessorsThunk({ limit, page, search: debouncedSearch }));
  }, [debouncedSearch, dispatch, limit, page]);

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
          value={search || ''}
          placeholder="Search by name or email..."
          onChange={onChangeSearchInput}
          onClearSearchInput={onClearSearchInput}
        />
        <WindowModal
          action={<IconButton
            aria-label="add"
            icon={<AddIcon />}
          />}
          body={(onClose) => addProfessor.children(onClose).content}
        />
      </HStack>
      <ViewTableProfessor />
      {professors.length !== 0 ? (
        <HStack
          width={'full'}
          justify={'space-between'}
        >
          <Text color={'text.pale'}>
            Result 1 - {professors.length} of {count}
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

export default SectionViewProfessors;
