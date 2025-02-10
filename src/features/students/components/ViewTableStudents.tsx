import { CheckIcon } from '@chakra-ui/icons';
import {
  Button,
  Icon,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import { useSelector } from 'react-redux';
import { deleteStudent, updateStudent } from '@/actions/definitions/students';
import ActionMenu from '@/components/ui/ActionMenu';
import { useClipboardAlert } from '@/hooks/useClipboardAlert';
import { RootState } from '@/store/store';
import { TStudent } from '@/types/student';

const ViewTableStudents = () => {
  const t = useTranslations();
  const { copyToClipboard } = useClipboardAlert();
  const { students, isLoading } = useSelector(
    (state: RootState) => state.students,
  );

  const listActions = (el: TStudent) => [updateStudent(el), deleteStudent()];

  if (isLoading) {
    return (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="PRIMARY_PURPLE"
        size="xl"
      />
    );
  }

  return (
    <TableContainer width={'100%'}>
      <Table size={'sm'}>
        <Thead>
          <Tr>
            <Th>{t('Full Name')}</Th>
            <Th>{t('Email')}</Th>
            <Th>{t('Group')}</Th>
            <Th>{t('Tel')}</Th>
            <Th>{t('Status')}</Th>
            <Th>{t('Created')}</Th>
            <Th>{t('Action')}</Th>
          </Tr>
        </Thead>
        <Tbody>
          {students.map((el) => (
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
              <Td>{el.group.groupCode}</Td>
              <Td>{el.tel}</Td>
              <Td>
                <Icon as={CheckIcon} />
              </Td>
              <Td></Td>
              <Td onClick={(e) => e.stopPropagation()}>
                <ActionMenu
                  actions={listActions}
                  data={el}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default ViewTableStudents;
