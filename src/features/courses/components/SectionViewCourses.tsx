import { AddIcon } from '@chakra-ui/icons';
import { Container, Heading, HStack, IconButton, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddNewCourse from './AddNewCourse';
import CourseCard from './CourseCard';
import WindowModal from '@/components/modal/WindowModal';
import Pagination from '@/components/ui/Pagination';
import SearchInput from '@/components/ui/SearchInput';
import useDebounce from '@/hooks/useDebounce';
import { setPage, setSearch } from '@/store/courses/courses.slice';
import { getCoursesThunk } from '@/store/courses/courses.thunks';
import { AppDispatch, RootState } from '@/store/store';


const SectionViewCourses = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    pagination: { page, limit, search },
    courses,
    count,
  } = useSelector((state: RootState) => state.courses);

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
    dispatch(getCoursesThunk({ limit, page, search: debouncedSearch }));
  }, [debouncedSearch, dispatch, limit, page]);

  let courseContent;
  if ((search !== '') && (courses.length === 0)){
    courseContent = (
      <VStack
        textAlign={'center'}
        height={'100%'}
        width={'full'}
        borderRadius={'10px'}
        gap={5}
      >
        <HStack
          width={'full'}
          justify={'space-between'}
        >
          <SearchInput
            value={search || ''}
            placeholder="Search by name..."
            onChange={onChangeSearchInput}
            onClearSearchInput={onClearSearchInput}
          />
          <WindowModal
            size="xl"
            action={<IconButton
              aria-label="add"
              icon={<AddIcon />}
            />}
            body={(onClose) => <AddNewCourse onClose={onClose} />}
          />
        </HStack>
        <VStack
          gap={3}
          marginBlock={2}
        >
          <Heading size={'md'}>Курс "{search}" не найден</Heading>
          <Text>Введите другое название или создайте новый курс</Text>
        </VStack>
        <WindowModal
          title={'Add new courses'}
          body={(onClose) => <AddNewCourse onClose={onClose} />}
        />
      </VStack>
    );
  } else if (!courses.length) {
    courseContent = (
      <Container
        textAlign={'center'}
        height={'100%'}
      >
        <VStack
          gap={2}
          mb={4}
        >
          <Heading size={'md'}>No courses</Heading>
          <Text>You have no courses</Text>
        </VStack>
        <WindowModal
          title={'Add new courses'}
          body={(onClose) => <AddNewCourse onClose={onClose} />}
        />
      </Container>
    );
  } else { courseContent = (
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
          placeholder="Search by name..."
          onChange={onChangeSearchInput}
          onClearSearchInput={onClearSearchInput}
        />
        <WindowModal
          size="2xl"
          action={<IconButton
            bg={'primary.purple'}
            color={'toast.text'}
            aria-label="add"
            icon={<AddIcon />}
          />}
          body={(onClose) => <AddNewCourse onClose={onClose} />}
        />
      </HStack>
      <SimpleGrid
        width={'full'}
        minChildWidth={60}
        spacing={5}
      >
        {
          courses.map((c) => (
            <CourseCard
              key={c.id}
              course={c}
            />
          ))
        }
      </SimpleGrid>
      {courses.length !== 0 ? (
        <HStack
          width={'full'}
          justify={'space-between'}
        >
          <Text color={'text.secondary'}>
            Result 1 - {courses.length} of {count}
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
  }
  return courseContent;
};

export default SectionViewCourses;
