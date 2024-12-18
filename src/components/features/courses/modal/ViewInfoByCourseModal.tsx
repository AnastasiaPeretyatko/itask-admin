import WindowModal from '@/components/modal/WindowModal'
import { getAllProfessorByCourseThunk } from '@/store/professor-course/professor-course.thunks'
import { AppDispatch, RootState } from '@/store/store'
import {
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AddProfessorToCourseModal from './AddProfessorToCourse'

const ViewInfoByCourseModal = ({ id }: { id: string }) => {
  const dispatch = useDispatch<AppDispatch>()
  const { data } = useSelector((state: RootState) => state.professorCourse)
  const { data: courses } = useSelector((state: RootState) => state.courses)

  useEffect(() => {
    dispatch(getAllProfessorByCourseThunk(id))
  }, [dispatch, id])

  const course = courses.find(el => el.id === id)

  return (
    <>
      <VStack mb={4} align={'start'}>
        <Heading size={'md'}>Название: {course?.name}</Heading>
        <Text>Описание: {course?.description}</Text>
      </VStack>

      {data.length ? (
        <TableContainer mb={4}>
          <Table>
            <Thead>
              <Tr>
                <Th>ФИО</Th>
                <Th>Позиция</Th>
                <Th>Группа</Th>
                <Th>Семестр</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map(el => {
                const { professor, semesterGroupCourse } = el
                return (
                  <Tr key={el.id}>
                    <Td>{professor.fullName}</Td>
                    <Td>{el.position}</Td>
                    <Td>{semesterGroupCourse.semesterGroup.group.groupCode}</Td>
                    <Td>{semesterGroupCourse.semesterGroup?.semester?.name}</Td>
                  </Tr>
                )
              })}
            </Tbody>
          </Table>
        </TableContainer>
      ) : (
        <Text mb={4} color={'gray.500'}>
          У этого предмета пока нет преподавателей
        </Text>
      )}
      {course && (
        <WindowModal
          modalBody={onClose => (
            <AddProfessorToCourseModal
              courseId={course?.id}
              onClose={onClose}
            />
          )}
          title="Добавить преподавателя"
        />
      )}
    </>
  )
}

export default ViewInfoByCourseModal
