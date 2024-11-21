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
import { CheckIcon } from '@chakra-ui/icons'
import CheckboxUI from '@/components/ui/CheckboxUI'
import { useTranslations } from 'next-intl'

const ViewTableStudents = () => {
  const t = useTranslations()
  const { data } = useSelector((state: RootState) => state.students)

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
            <Th>{t("Fullname")}</Th>
            <Th>{t("Group")}</Th>
            <Th>{t("Tel")}</Th>
            <Th>{t("Status")}</Th>
            <Th>{t("Created")}</Th>
            <Th>{t("Action")}</Th>
          </Tr>
        </Thead>
        <Tbody>
          {values && 
            values.map(el => (
              <Tr key={el.id} onClick={() => handleIndividualCheck(el.id)}>
                <Td>
                  <CheckboxUI
                    isChecked={el.checked}
                    onCheckedChange={() => handleIndividualCheck(el.id)}
                  />
                </Td>
                <Td>
                  <HStack>
                    <Avatar boxSize={10} />
                    <VStack align={'start'} gap={1}>
                      <Text
                        fontSize={'md'}
                        fontWeight={'500'}
                        color={'text.bold'}
                      >
                        {el.fullName}
                      </Text>
                      <Text fontSize={'sm'} color={'text.pale'}>
                        {el.user.email}
                      </Text>
                    </VStack>
                  </HStack>
                </Td>
                <Td>{el.group.groupCode}</Td>
                <Td>{el.tel}</Td>
                <Td>
                  <Icon as={CheckIcon} />
                </Td>
                <Td>{/* <ActionMenu professor={el} /> */}</Td>
                <Td>{/* <ActionMenu professor={el} /> */}</Td>

              </Tr>
            ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default ViewTableStudents
