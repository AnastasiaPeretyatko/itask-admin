import { AddIcon } from '@chakra-ui/icons';
import { Avatar, Box, Flex, Grid, HStack, IconButton, Spinner, Text, useBoolean, VStack } from '@chakra-ui/react';
// import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import AddNewRecourd from './AddNewRecourd';
import WindowModal from '@/components/modal/WindowModal';
import Empty from '@/components/ui/Empty';
import { RootState } from '@/store/store';


const TableCourseInfo = () => {
  const { current, groups, isLoading } = useSelector((state: RootState) => state.course);
  const [addRecord, setAddRecord] = useBoolean(false);
  // const router = useRouter();

  if(isLoading) {
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

  if(!groups?.length){
    return (
      <Empty>Записей не найдено</Empty>
    );
  }

  return (
    <VStack
      width={'full'}
      border={'1px solid'}
      borderColor={'divider'}
      gap={0}
    >
      <Grid
        width={'full'}
        templateColumns="repeat(3, 1fr)"
        padding={2}
        borderBottom={'1px solid'}
        borderColor={'divider'}
        color={'text.lighter'}
      >
        <Box>Группы</Box>
        <Box>Семестр</Box>
        <Box>Преподаватели</Box>
      </Grid>
      {
        groups.map((g) => (
          <Grid
            width={'full'}
            key={g.id}
            onMouseMove={setAddRecord.on}
            onMouseLeave={setAddRecord.off}
            templateColumns="repeat(3, 1fr)"
            position={'relative'}
            padding={2}
          >
            <WindowModal
              action={(
                <IconButton
                  aria-label="add"
                  position={'absolute'}
                  left={'-20px'}
                  top={'50%'}
                  transform={'translate(-50%, -50%)'}
                  size={'sm'}
                  icon={<AddIcon/>}
                  variant={'unstyled'}
                  overflow={addRecord ? 'visible' : 'hidden'}
                  opacity={addRecord ? 1 : 0}
                />
              )}
              body={(onClose) => (
                <AddNewRecourd
                  onClose={onClose}
                  data={g}
                  courseId={current?.id}
                />
              )}
            />
            <Flex align={'center'}>{g.group?.groupCode}</Flex>
            <VStack>{g.semesters?.map((e) => (
              <HStack
                width={'full'}
                align={'start'}
              >
                <Text>{e.name}</Text>
              </HStack>
            ))}
            </VStack>
            <VStack
              width={'full'}
              align={'start'}
            >
              {g.professors?.map((e) => (
                <HStack
                  // onClick={() => router.push(`/professors/${e.id}`)}
                  _hover={{ cursor: 'pointer',color: 'primary.purple' }}
                >
                  <Avatar
                    size={'xs'}
                    name={e.fullName}
                  />
                  <Text color={'inherit'}>{e.fullName}</Text>
                </HStack>
              ))}
            </VStack>
          </Grid>
        ))
      }
    </VStack>
  );
};

export default TableCourseInfo;