import { RootState } from '@/store/store'
import {
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'
import CheckboxUI from '@/components/ui/CheckboxUI'
import WindowModal from '@/components/modal/WindowModal'
import ViewInfoByCourseModal from './modal/ViewInfoByCourseModal'

const ViewTableCourse = () => {
  const { data } = useSelector((state: RootState) => state.courses)

  const [values, setValues] = useState(
    data ? data.map(item => ({ ...item, checked: false })) : []
  )

  const allChecked = values.every(value => value.checked)
  const indeterminate = values.some(value => value.checked) && !allChecked

  const handleCheckAll = () => {
    setValues(values.map(item => ({ ...item, checked: !allChecked })))
  }

  const handleIndividualCheck = (id: string) => {
    setValues(
      values.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    )
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    console.log('data', data)
    if (data) {
      setValues(data.map(item => ({ ...item, checked: false })))
    }
  }, [data])

  if (!data) {
    return (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="PRIMARY_PURPLE"
        size="xl"
      />
    )
  }

  return (
    <TableContainer width={'100%'}>
      <Table size={'sm'}>
        <Thead>
          <Tr>
            <Th>
              <CheckboxUI
                isChecked={allChecked}
                indeterminate={indeterminate}
                onCheckedChange={handleCheckAll}
              />
            </Th>
            <Th>Name</Th>
            <Th>Description</Th>
            <Th>Created</Th>
          </Tr>
        </Thead>
        <Tbody>
          {values &&
            values.map(el => (
              <Tr key={el.id}>
                <Td>
                  <CheckboxUI
                    isChecked={el.checked}
                    onCheckedChange={() => handleIndividualCheck(el.id)}
                  />
                </Td>
                <WindowModal
                  action={<Td>{el.name}</Td>}
                  modalBody={() => <ViewInfoByCourseModal id={el.id} />}
                  title="Информация о курсе"
                />
                <Td
                  maxW={'400px'}
                  overflowX={'hidden'}
                  wordBreak={'break-word'}
                  textOverflow={'ellipsis'}
                >
                  {el.description}
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
  )
}

export default ViewTableCourse
