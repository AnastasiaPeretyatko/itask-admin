import { CloseIcon } from '@chakra-ui/icons';
import { Avatar, HStack, IconButton, Text } from '@chakra-ui/react';

const PeopleOption = () => {
  return (
    <HStack
      align={'center'}
      paddingY={'0.5'}
      paddingX={2}
      borderRadius={10}
      border={'1px solid'}
      borderColor={'input.outline'}
      fontSize={'xs'}
      whiteSpace={'nowrap'}
    >
      <Avatar
        width={4}
        height={4}
        name="John Doe"
      />
      <Text>John Doe</Text>
      <IconButton
        variant={'unstyled'}
        aria-label=""
        icon={<CloseIcon boxSize={2} />}
        size="xs"
      />
    </HStack>
  );
};

export default PeopleOption;