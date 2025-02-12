import { AddIcon } from '@chakra-ui/icons';
import { Card, Container, Heading, HStack, IconButton, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddNewCourse from './AddNewCourse';
import ViewTableCourse from './ViewTableCourses';
import WindowModal from '@/components/modal/WindowModal';
import { getCoursesThunk } from '@/store/courses/courses.thunks';
import { AppDispatch, RootState } from '@/store/store';

const SectionViewCourses = () => {
  const t = useTranslations();
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
          title={t('Add new courses')}
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
      <ViewTableCourse />
      <SimpleGrid>
        {
          courses.map(c => (
            <Card key={c.id}>{c.name}</Card>
          ))
        }
      </SimpleGrid>
      {/* {courses.length !== 0 ? (
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
      ) : null} */}
    </VStack>
  );
};

export default SectionViewCourses;
