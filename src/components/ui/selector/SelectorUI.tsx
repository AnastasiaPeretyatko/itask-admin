import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import {
  Container,
  HStack,
  Icon,
  List,
  ListItem,
  Text,
  useDisclosure,
  useOutsideClick,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import Label from '../Label';

type Props<T extends FieldValues> = {
  control: Control<T>
  name: Path<T>
  label?: string
  options: string[]
  size?: number
  value?: string
}

const SelectorUI = <T extends FieldValues>({
  size,
  label,
  control,
  name,
  options,
}: Props<T>) => {
  const ref = useRef(null);
  const { isOpen, onToggle, onClose } = useDisclosure();

  useOutsideClick({
    ref: ref,
    handler: () => onClose(),
  });

  return (
    <Container
      width={size || 'full'}
      position={'relative'}
      ref={ref}
      padding={0}
    >
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <>
            <Container
              variant={'selectorLine'}
              bgGradient={
                isOpen
                  ? 'linear(to-r, secondary.blue, primary.purple)'
                  : 'none'
              }
            >
              <Container
                variant={'selector'}
                onClick={onToggle}
              >
                {label ? (
                  <Label
                    text={label}
                    isFocus
                  />
                ) : null}
                <HStack>
                  <Text>{field.value ?? options[0]}</Text>
                </HStack>
                <Icon as={isOpen ? ChevronUpIcon : ChevronDownIcon} />
              </Container>
            </Container>
            {isOpen ? (
              <List variant={'selectList'}>
                {options.map((item) => (
                  <ListItem
                    display={'flex'}
                    flexDir={'row'}
                    alignItems={'center'}
                    gap={2}
                    key={Math.random()}
                    onClick={() =>{
                      field.onChange(item);
                      onClose();
                    }}
                  >
                    {item}
                  </ListItem>
                ))}
              </List>
            ) : null}
          </>
        )}
      />
    </Container>
  );
};

export default SelectorUI;
