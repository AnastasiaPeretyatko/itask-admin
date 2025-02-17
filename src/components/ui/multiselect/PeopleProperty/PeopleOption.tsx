import { Avatar, HStack, ListItem, Text } from '@chakra-ui/react';
import { TName } from '@/types/groups';

type Props = {
  option: TName;
  onChangeLocalValues: (values: TName) => void;
}

const PeopleOption = ({ option, onChangeLocalValues }: Props) => {

  return (
    <HStack
      as={ListItem}
      fontSize={'xs'}
      onClick={() => onChangeLocalValues(option)}
    >
      <Avatar
        width={5}
        height={5}
        name={option?.name}
      />
      <Text>{option?.name}</Text>
    </HStack>

  );
};

export default PeopleOption;