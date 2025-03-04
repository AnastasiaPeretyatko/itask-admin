import { Box, Heading, Skeleton } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '@/components/Layout/AppLayout';
import WindowModal from '@/components/modal/WindowModal';
import Editor from '@/components/ui/Editor/Editor';
import AddNewGroupToCourse from '@/features/courses/components/AddNewGroupToCourse';
import TableCourseInfo from '@/features/courses/components/TableCourseInfo';
import { course } from '@/store/courses/courses.thunks';
import { AppDispatch, RootState } from '@/store/store';

const CoursePage = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { current, isLoading } = useSelector((state: RootState) => state.course);
  const { id } = router.query;

  useEffect(() => {
    if (id && typeof id === 'string') {
      Promise.all([
        dispatch(course.info(id)),
        dispatch(course.groups(id)),
      ]);
    }
  }, [dispatch, id]);

  return (
    <AppLayout>
      <Skeleton
        isLoaded={!isLoading}
        fadeDuration={4}
        minH={10}
        mb={3}
        ml={12}
      >
        <Heading size={'lg'}>{current?.name}</Heading>
      </Skeleton>

      <Box ml={12}>
        <Skeleton
          isLoaded={!isLoading}
          fadeDuration={4}
          minH={20}
          mb={3}
        >
          <Editor
            initialContent={current?.description}
          // onChange={(value) => null}
          />
        </Skeleton>

        <Skeleton
          isLoaded={!isLoading}
          fadeDuration={4}
          minH={56}
          mb={3}
        >
          <WindowModal body={(onClose) => <AddNewGroupToCourse onClose={onClose}/>}/>
          <TableCourseInfo/>
        </Skeleton>

      </Box>
    </AppLayout>
  );
};

export default CoursePage;
