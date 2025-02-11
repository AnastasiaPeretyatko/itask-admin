import { Flex, Input } from '@chakra-ui/react';
import PeopleOption from './peopleOption';

export enum VIEW {
  LIST = 'list',
  INPUT = 'input',
}

type Props = {
  renderItem?: any
  renderOption?: any
  options?: any[]
  value?: any[]
  view?: VIEW
}
const Multiselect = ({ view }: Props) => {
  return (
    <Flex
      padding={1}
      align={'center'}
      flexWrap={'wrap'}
      gap={2}
      sx={
        view === VIEW.INPUT
          ? {
            borderColor: 'input.outline',
            borderWidth: 1,
            borderRadius: 7,
          }
          : undefined
      }
    >
      <PeopleOption />
      <PeopleOption />

      <PeopleOption />
      <PeopleOption />
      <PeopleOption />

      <Input
        variant={'unstyled'}
        maxW={'full'}
        width={'min-content'}
        minW={10}
        size={'xs'}
      />
    </Flex>
  );
};



export default Multiselect;
