import { AddIcon } from '@chakra-ui/icons';
import { Container, Heading, HStack, IconButton, Text, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreateGroup from './CreateGroup';
import ViewTableGroups from './ViewTableGroups';
import { createGroup } from '@/actions/definitions/groups';
import WindowModal from '@/components/modal/WindowModal';
import Pagination from '@/components/ui/Pagination';
import SearchInput from '@/components/ui/SearchInput';
import useDebounce from '@/hooks/useDebounce';
import { setSearch } from '@/store/groups/groups.slice';
import { getGroupsThunk } from '@/store/groups/groups.thunks';
import { setPage } from '@/store/professors/professors.slice';
import { AppDispatch, RootState } from '@/store/store';

const SectionViewGroups = () => {
  const {
    groups,
    count,
    pagination: { page, limit, search },
  } = useSelector((state: RootState) => state.groups);
  const dispatch = useDispatch<AppDispatch>();

  const debouncedSearch = useDebounce(search, 500);

  const onChangeSearchInput = (value: string) => {
    dispatch(setSearch(value));
  };

  const onClearSearchInput = () => dispatch(setSearch(''));

  const onChangePage = (page: number) => {
    dispatch(setPage(page));
  };

  useEffect(() => {
    dispatch(getGroupsThunk({ limit, page, search: debouncedSearch }));
  }, [debouncedSearch, page, limit, dispatch]);

  if (groups.length === 0) {
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
          body={(onClose) => <CreateGroup onClose={onClose} />}
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
          body={(onClose) => createGroup.children(onClose).content}
        />
      </HStack>
      <ViewTableGroups />
      {groups.length !== 0 ? (
        <HStack
          width={'full'}
          justify={'space-between'}
        >
          <Text color={'text.secondary'}>
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
  );
};

export default SectionViewGroups;
