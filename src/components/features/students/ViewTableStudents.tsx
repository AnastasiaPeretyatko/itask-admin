import { CheckIcon } from '@chakra-ui/icons';
import {
  Avatar,
  HStack,
  Icon,
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
import { useTranslations } from 'next-intl';
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import CheckboxUI from '@/components/ui/CheckboxUI';
import { TStudent } from '@/types/student';

type Props = {
  students?: TStudent[]
}

const ViewTableStudents = ({ students }: Props) => {
  const t = useTranslations();
  // const { data } = useSelector((state: RootState) => state.students)

  const [values, setValues] = useState(
    students ? students.map((item) => ({ ...item, checked: false })) : [],
  );

  const allChecked = values.every((value) => value.checked);
  const indeterminate = values.some((value) => value.checked) && !allChecked;

  const handleCheckAll = () => {
    setValues(values.map((item) => ({ ...item, checked: !allChecked })));
  };

  const handleIndividualCheck = (
    event: ChangeEvent<HTMLInputElement> | MouseEvent<HTMLTableRowElement>,
    id: string,
  ) => {
    event.preventDefault();
    setValues(
      values.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item,
      ),
    );
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (students) {
      setValues(students.map((item) => ({ ...item, checked: false })));
    }
  }, [students]);

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
            <Th>{t('Group')}</Th>
            <Th>{t('Tel')}</Th>
            <Th>{t('Status')}</Th>
            <Th>{t('Created')}</Th>
            <Th>{t('Action')}</Th>
          </Tr>
        </Thead>
        <Tbody>
          {values ? values.map((el) => (
            <Tr
              key={el.id}
              onClick={(e) => handleIndividualCheck(e, el.id)}
            >
              <Td>
                <CheckboxUI
                  isChecked={el.checked}
                  onCheckedChange={(e) => handleIndividualCheck(e, el.id)}
                />
              </Td>
              <Td>
                <HStack>
                  <Avatar boxSize={10} />
                  <VStack
                    align={'start'}
                    gap={1}
                  >
                    <Text
                      fontSize={'md'}
                      fontWeight={'500'}
                      color={'text.bold'}
                    >
                      {el.fullName}
                    </Text>
                    <Text
                      fontSize={'sm'}
                      color={'text.pale'}
                    >
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
              <Td></Td>
              <Td onClick={(e) => e.stopPropagation()}>
                {/* <ActionMenu actions={actionsMenu} data={el}/> */}
              </Td>
            </Tr>
          )) : null}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default ViewTableStudents;
