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
import CheckboxUI from '../../ui/CheckboxUI'
import moment from 'moment'
import ActionMenu from './ActionMenu'
import { useTranslations } from 'next-intl'

const ViewTableGroups = () => {
  const t = useTranslations()
  const { data } = useSelector((state: RootState) => state.groups)

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
    <TableContainer width={'100%'} >
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
            <Th>{t('Name')}</Th>
            <Th>{t('University')}</Th>
            <Th>{t('Degree')}</Th>
            <Th>{t('Education mode')}</Th>
            <Th>{t('Created')}</Th>
            <Th>{t('Action')}</Th>
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
                <Td>{el.groupCode}</Td>
                <Td>{el.university.name}</Td>
                <Td>{el.degree}</Td>
                <Td>{el.educationMode}</Td>
                <Td>{moment(el.created_at).format('DD/MM/YYYY')}</Td>
                <Td>
                  <ActionMenu group={el} />
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default ViewTableGroups