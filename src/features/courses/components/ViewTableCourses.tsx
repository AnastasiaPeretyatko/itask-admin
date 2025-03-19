import {
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import moment from 'moment';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import ViewInfoByCourseModal from './modal/ViewInfoByCourseModal';
// import WindowModal from '@/components/modal/WindowModal';
import { getCoursesThunk } from '@/store/courses/courses.thunks';
import { AppDispatch, RootState } from '@/store/store';

const ViewTableCourse = () => {
  const { courses, isLoading } = useSelector((state: RootState) => state.courses);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getCoursesThunk());
  }, [dispatch]);

  if (isLoading) {
    return (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="coldGray"
        color="primary.purple"
        size="xl"
      />
    );
  }

  return (
    <TableContainer width={'100%'}>
      <Table size={'sm'}>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Description</Th>
            <Th>Created</Th>
          </Tr>
        </Thead>
        <Tbody>
          {courses.map((el) => (
            <Tr key={el.id}>
              {/* <WindowModal
                action={<Td>{el.name}</Td>}
                modalBody={() => <ViewInfoByCourseModal id={el.id} />}
                title="Информация о курсе"
              /> */}
              <Td
                maxW={'400px'}
                overflowX={'hidden'}
                wordBreak={'break-word'}
                textOverflow={'ellipsis'}
              >
                {/* {el.description} */}
              </Td>
              <Td>{moment(el.createdAt).format('DD/MM/YYYY')}</Td>
              {/* <Td>
                  <ActionMenu professor={el} />
                </Td> */}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default ViewTableCourse;