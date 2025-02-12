
import { CloseIcon } from '@chakra-ui/icons';
import { Avatar, HStack, IconButton, Text } from '@chakra-ui/react';
import { TName } from '@/types/groups';

type Props = {
  option: TName;
  onDeleteValue: (value: TName) => void;
}

const PeopleItem = ({ option, onDeleteValue }: Props) => {
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
        name={option?.name}
      />
      <Text>{option?.name}</Text>
      <IconButton
        variant={'unstyled'}
        aria-label=""
        icon={<CloseIcon boxSize={2} />}
        size="xs"
        onClick={() => onDeleteValue(option)}
      />
    </HStack>

  );
};

export default PeopleItem;