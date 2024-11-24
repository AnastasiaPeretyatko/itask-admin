import { RootState } from '@/store/store'
import {
  Avatar,
  HStack,
  Icon,
  Spinner,
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
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { CheckIcon } from '@chakra-ui/icons'
import CheckboxUI from '@/components/ui/CheckboxUI'
import ActionMenu from '../../ui/ActionMenu'
import { getProfessorsMenuConfig } from './config/getProfessorMenuConfig'

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

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
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
                <Td>
                  <HStack>
                    <Avatar />
                    <VStack align={'start'} gap={0}>
                      <Text>{el.fullName}</Text>
                      <Text color={'text.pale'}>{el.user.email}</Text>
                    </VStack>
                  </HStack>
                </Td>
                <Td>{el.description}</Td>
                <Td>{el.tel}</Td>
                <Td>{moment(el.createdAt).format('DD/MM/YYYY')}</Td>
                <Td>
                  <Icon as={CheckIcon} />
                </Td>
                <Td onClick={e => e.stopPropagation()}>
                  <ActionMenu actions={getProfessorsMenuConfig(el)} />
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default ViewTableProfessor
