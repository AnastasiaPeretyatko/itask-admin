import {
  Badge,
  Button,
  Container,
  Heading,
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
import moment from 'moment'
import { useTranslations } from 'next-intl'
import { useSelector } from 'react-redux'
import {
  addProfessor,
  deleteProfessor,
  updateProfessor,
} from '@/actions/definitions/professors'
import { STATUS_USER } from '@/assets/constants/enum'
import WindowModal from '@/components/modal/WindowModal'
import ActionMenu from '@/components/ui/ActionMenu'
import { RootState } from '@/store/store'
import { TProfessor } from '@/types/professor'
import { useClipboardAlert } from '@/hooks/useClipboardAlert'

const ViewTableProfessor = () => {
  const t = useTranslations()
  const { copyToClipboard } = useClipboardAlert()
  const { professors } = useSelector((state: RootState) => state.professors)

  const listActions = (el: TProfessor) => [
    updateProfessor(el),
    deleteProfessor(),
  ]

  if (!professors) {
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

  if (professors.length === 0) {
    return (
      <Container textAlign={'center'} height={'100%'}>
        <VStack gap={2} mb={4}>
          <Heading size={'md'}>No professors</Heading>
          <Text>You have no professors</Text>
        </VStack>
        <WindowModal
          title={'Create Professor'}
          body={onClose => addProfessor.children(onClose).content}
        />
      </Container>
    )
  }

  return (
    <TableContainer width={'100%'}>
      <Table size={'sm'}>
        <Thead>
          <Tr>
            <Th>{t('Full Name')}</Th>
            <Th>{t('Email')}</Th>
            <Th>{t('Tel')}</Th>
            <Th>{t('Added')}</Th>
            <Th>{t('Status')}</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {professors.map(el => (
            <Tr key={el.id}>
              <Td>{el.fullName}</Td>
              <Td>
                <Button
                  variant={'link'}
                  onClick={() => copyToClipboard(el.user.email)}
                >
                  {el.user.email}
                </Button>
              </Td>
              <Td>{el.tel}</Td>
              <Td>{moment(el.createdAt).format('DD.MM.YYYY')}</Td>
              <Td>
                <Badge bg={STATUS_USER.ACTIVE ? 'green.100' : 'red.100'}>
                  {STATUS_USER.ACTIVE}
                </Badge>
              </Td>
              <Td onClick={e => e.stopPropagation()}>
                <ActionMenu actions={listActions} data={el} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default ViewTableProfessor
