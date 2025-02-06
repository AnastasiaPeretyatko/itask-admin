import { AddIcon } from '@chakra-ui/icons';
import { HStack, IconButton, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
// import { useTranslations } from 'next-intl'
import { useDispatch, useSelector } from 'react-redux';
import ViewTableProfessor from './ViewTableProfessors';
import { addProfessor } from '@/actions/definitions/professors';
import WindowModal from '@/components/modal/WindowModal';
import Pagination from '@/components/ui/Pagination';
import SearchInput from '@/components/ui/SearchInput';
import useDebounce from '@/hooks/useDebounce';
import { getProfessorsThunk } from '@/store/professors/professors.thunks';
import { AppDispatch, RootState } from '@/store/store';

const SectionViewProfessors = () => {
  // const t = useTranslations()
  const { data, count } = useSelector((state: RootState) => state.professors);
  const dispatch = useDispatch<AppDispatch>();
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    search: '',
  });

  const debouncedSearch = useDebounce(params.search, 500);

  const onChangeSearchInput = (value: string) => {
    setParams((prev) => ({ ...prev, search: value }));
  };

  const onClearSearchInput = () => {
    setParams((prev) => ({ ...prev, search: '' }));
  };

  const onChangePage = (page: number) => {
    setParams((prev) => ({ ...prev, page }));
  };

  useEffect(() => {
    dispatch(
      getProfessorsThunk({
        limit: params.limit,
        page: params.page,
        search: debouncedSearch,
      }),
    );
  }, [debouncedSearch, params.page, params.limit, dispatch]);

  console.log(data);

  return (
    <VStack
      width={'full'}
      borderRadius={'10px'}
      padding={4}
      gap={4}
    >
      <HStack
        width={'full'}
        justify={'space-between'}
      >
        <SearchInput
          value={params.search}
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
      <HStack
        width={'full'}
        justify={'space-between'}
      >
        <Text color={'text.pale'}>
            Result 1 - {data.length} of {count}
        </Text>
        <Pagination
          count={count}
          page={params.page}
          limit={params.limit}
          onChangePage={onChangePage}
        />
      </HStack>
    </VStack>
  );
};

export default SectionViewProfessors;
