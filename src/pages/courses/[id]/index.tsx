import { Box, Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '@/components/Layout/AppLayout';
import Editor from '@/components/ui/Editor/Editor';
import TableCourseInfo from '@/features/courses/components/TableCourseInfo';
import { course } from '@/store/courses/courses.thunks';
import { AppDispatch, RootState } from '@/store/store';

const CoursePage = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { current, data } = useSelector((state: RootState) => state.course);

  useEffect(() => {
    const id = router.query.id;
    if (id && typeof id === 'string') {
      Promise.all([

        dispatch(course.info(id)),
        dispatch(course.groups(id)),
      ]);
    }
  }, [dispatch, router]);

  console.log(data);

  return (
    <AppLayout>
      <Heading
        size={'lg'}
        mb={3}
        ml={12}
      >{current?.name}</Heading>
      <Box ml={12}>
        <Editor
          initialContent={current?.description}
          onChange={(value) => console.log(value)}
        />
        <TableCourseInfo/>
      </Box>
    </AppLayout>
  );
};

export default CoursePage;
