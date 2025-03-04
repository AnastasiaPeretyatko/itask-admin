import { AddIcon } from '@chakra-ui/icons';
import { Container, Heading, HStack, IconButton, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddNewCourse from './AddNewCourse';
import CourseCard from './CourseCard';
import WindowModal from '@/components/modal/WindowModal';
import { getCoursesThunk } from '@/store/courses/courses.thunks';
import { AppDispatch, RootState } from '@/store/store';

const SectionViewCourses = () => {
  const { courses } = useSelector((state: RootState) => state.courses);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getCoursesThunk());
  }, [dispatch]);

  if (courses.length === 0) {
    return (
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
        {/* <SearchInput
          onClearSearchInput={onClearSearchInput}
          onChange={onChangeSearchInput}
          value={search || ''}
          size="sm"
        /> */}
        <WindowModal
          size="xl"
          action={<IconButton
            aria-label="add"
            icon={<AddIcon />}
          />}
          body={(onClose) => <AddNewCourse onClose={onClose} />}
        />
      </HStack>
      {/* <ViewTableCourse /> */}
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
    </VStack>
  );
};

export default SectionViewCourses;
