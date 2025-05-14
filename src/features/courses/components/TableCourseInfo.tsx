import { Box, Grid, Spinner, VStack } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import GroupColumn from './GroupColumn';
import Empty from '@/components/ui/Empty';
import { RootState } from '@/store/store';

const TableCourseInfo = () => {
  const { groups, isLoading } = useSelector((state: RootState) => state.course);

  if(isLoading) {
    return (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="coldGray"
        color="primary.purple"
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
      { groups.map((g) => ( <GroupColumn g={g} /> )) }
    </VStack>
  );
};

export default TableCourseInfo;