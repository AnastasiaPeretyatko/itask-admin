import { RootState } from '@/store/store'
import {
  Icon,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import CheckboxUI from '../ui/CheckboxUI'
import moment from 'moment'
import { CheckIcon } from '@chakra-ui/icons'
import { CiMenuKebab } from 'react-icons/ci'

const ViewTableProfessor = () => {
  const { data } = useSelector((state: RootState) => state.professors)

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

  if (!data) {
    return <Text>Не найдено</Text>
  }

  useEffect(() => {
    setValues(data.map(item => ({ ...item, checked: false })))
  }, [data])

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
            <Th>Full name</Th>
            <Th>Email</Th>
            <Th>Description</Th>
            <Th>Tel</Th>
            <Th>Created</Th>
            <Th>Status</Th>
            <Th>Action</Th>
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
                <Td>{el.fullName}</Td>
                <Td>{el.user.email}</Td>
                <Td>{el.description}</Td>
                <Td>{el.tel}</Td>
                <Td>{moment(el.createdAt).format('DD/MM/YYYY')}</Td>
                <Td>
                  <Icon as={CheckIcon} />
                </Td>
                <Td>
                  <IconButton aria-label="" icon={<CiMenuKebab />} />
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default ViewTableProfessor
