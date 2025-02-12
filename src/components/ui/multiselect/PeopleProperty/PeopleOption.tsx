import { Avatar, HStack, ListItem, Text } from '@chakra-ui/react';
import { TName } from '@/types/groups';

const PeopleOption = ({ option }: { option: TName }) => {
  console.log(option);
  return (
    <HStack
      as={ListItem}
      fontSize={'xs'}
    >
      <Avatar
        width={4}
        height={4}
        name={option.name}
      />
      <Text>{option.name}</Text>
    </HStack>

  );
};

export default PeopleOption;