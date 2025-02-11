import { Avatar, HStack, ListItem, Text } from '@chakra-ui/react';

const PeopleOption = ({ option }: { option: any }) => {
  return (
    <HStack
      as={ListItem}
      fontSize={'xs'}
    >
      <Avatar
        width={4}
        height={4}
      />
      <Text>John Doe</Text>
    </HStack>

  );
};

export default PeopleOption;