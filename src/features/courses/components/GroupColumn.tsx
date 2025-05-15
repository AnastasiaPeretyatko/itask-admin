import { AddIcon } from '@chakra-ui/icons';
import { Avatar, Flex, Grid, HStack, IconButton, Text, useBoolean, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';
import AddNewRecord from './AddNewRecourd';
import WindowModal from '@/components/modal/WindowModal';
import { RootState } from '@/store/store';
import { Assignment } from '@/types/courses';

const GroupColumn = ({ g }: {g: Assignment}) => {
  const { current } = useSelector((state: RootState) => state.course);
  const [addRecord, setAddRecord] = useBoolean(false);
  const router = useRouter();

  return (
    <Grid
      width={'full'}
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
          <AddNewRecord
            onClose={onClose}
            data={g}
            courseId={current?.id}
          />
        )}
      />
      <Flex align={'center'}>{g.group?.groupCode}</Flex>
      <VStack align={'start'}>
        <Text>{g.semester?.name}</Text>
      </VStack>
      <VStack
        width={'full'}
        align={'start'}
      >
        <HStack
          onClick={() => router.push(`/professors/${g.professor.id}`)}
          _hover={{ cursor: 'pointer',color: 'primary.purple' }}
        >
          <Avatar
            size={'xs'}
            name={g.professor.fullName}
          />
          <Text color={'inherit'}>{g.professor.fullName}</Text>
        </HStack>
      </VStack>
    </Grid>
  );
};

export default GroupColumn;