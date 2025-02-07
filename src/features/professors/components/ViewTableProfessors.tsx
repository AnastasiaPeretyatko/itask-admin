import {
  Badge,
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
} from '@chakra-ui/react';
import moment from 'moment';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { addProfessor, deleteProfessor, updateProfessor } from '@/actions/definitions/professors';
import { STATUS_USER } from '@/assets/constants/enum';
import WindowModal from '@/components/modal/WindowModal';
import ActionMenu from '@/components/ui/ActionMenu';
import CheckboxUI from '@/components/ui/CheckboxUI';
import { RootState } from '@/store/store';
import { TProfessor } from '@/types/professor';

const ViewTableProfessor = () => {
  const t = useTranslations();
  const { professors } = useSelector((state: RootState) => state.professors);

  const [values, setValues] = useState(
    professors ? professors.map((item) => ({ ...item, checked: false })) : [],
  );

  const allChecked = values.every((value) => value.checked);
  const indeterminate = values.some((value) => value.checked) && !allChecked;

  const handleCheckAll = () => {
    setValues(values.map((item) => ({ ...item, checked: !allChecked })));
  };

  const handleIndividualCheck = (id: string) => {
    setValues(
      values.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item,
      ),
    );
  };

  const listActions = (el: TProfessor) => [updateProfessor(el), deleteProfessor(el)];


  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (professors) {
      setValues(professors.map((item) => ({ ...item, checked: false })));
    }
  }, [professors]);

  if (!professors) {
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

  if (professors.length === 0) {
    return (
      <Container
        textAlign={'center'}
        height={'100%'}
      >
        <VStack
          gap={2}
          mb={4}
        >
          <Heading size={'md'} >No professors</Heading>
          <Text>You have no professors</Text>
        </VStack>
        <WindowModal
          title={'Create Professor'}
          body={(onClose) => addProfessor.children(onClose).content}
        />
      </Container>
    );
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
            <Th>{t('Full Name')}</Th>
            <Th>{t('Email')}</Th>
            <Th>{t('Tel')}</Th>
            <Th>{t('Added')}</Th>
            <Th>{t('Status')}</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {values ? values.map((el) => (
            <Tr
              key={el.id}
              onClick={(e) => {
                e.stopPropagation();
                handleIndividualCheck(el.id);
              }}
            >
              <Td>
                <CheckboxUI
                  isChecked={el.checked}
                  onCheckedChange={() => handleIndividualCheck(el.id)}
                />
              </Td>
              <Td>{el.fullName}</Td>
              <Td>{el.user.email}</Td>
              <Td>{el.tel}</Td>
              <Td>{moment(el.createdAt).format('DD.MM.YYYY')}</Td>
              <Td>
                <Badge bg={STATUS_USER.ACTIVE ? 'green.100' : 'red.100'}>
                  {STATUS_USER.ACTIVE}
                </Badge>
              </Td>
              <Td onClick={(e) => e.stopPropagation()}>
                <ActionMenu
                  actions={listActions}
                  data={el}
                />
              </Td>
            </Tr>
          )) : null}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default ViewTableProfessor;
