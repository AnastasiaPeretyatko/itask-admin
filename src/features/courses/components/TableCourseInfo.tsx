import { Spinner, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';


const TableCourseInfo = () => {
  const { data } = useSelector((state: RootState) => state.course);

  if(!data) {return (
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="PRIMARY_PURPLE"
      size="xl"
    />
  );}

  return (
    <TableContainer>
      <Table size={'sm'}>
        <Thead>
          <Th>Группы</Th>
          <Th>Семестр</Th>
          <Th>Преподаватели</Th>
        </Thead>
        <Tbody>
          {data?.map((el) => (
            <Tr key={el.id}>
              <Td>{el.group?.groupCode}</Td>
              <Td>двдвд</Td>
              <Td>{el.professors?.fullName}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default TableCourseInfo;