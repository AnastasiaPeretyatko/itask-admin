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
import { useSelector } from 'react-redux'
import moment from 'moment'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/router'
import ActionMenu from '@/components/ui/ActionMenu'
import { deleteGroup, updateGroup } from '@/actions/definitions/groups'
import { TGroup } from '@/types/groups'

const ViewTableGroups = () => {
  const t = useTranslations()
  const { groups } = useSelector((state: RootState) => state.groups)
  const router = useRouter()

  const listActions = (el: TGroup) => [updateGroup(el), deleteGroup()]

  if (!groups.length) {
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
            <Th>{t('Name')}</Th>
            <Th>{t('University')}</Th>
            <Th>{t('Degree')}</Th>
            <Th>{t('Education mode')}</Th>
            <Th>{t('Created')}</Th>
            <Th>{t('Action')}</Th>
          </Tr>
        </Thead>
        <Tbody>
          {groups.map(el => (
            <Tr key={el.id}>
              <Td
                cursor={'pointer'}
                _hover={{ color: 'primary.purple' }}
                onClick={() => router.push(`/groups/${el.id}`)}
              >
                {el.groupCode}
              </Td>
              <Td>{el.university.name}</Td>
              <Td>{el.degree}</Td>
              <Td>{el.educationMode}</Td>
              <Td>{moment(el.created_at).format('DD.MM.YYYY')}</Td>
              <Td>
                <ActionMenu actions={listActions} data={el} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default ViewTableGroups
