import { Collapse, Grid, HStack, Input, List, Text, useBoolean, useOutsideClick, VStack } from '@chakra-ui/react';
import { useEffect, useMemo, useRef } from 'react';
import { BsPeople } from 'react-icons/bs';

export enum VIEW {
  LIST = 'list',
  INPUT = 'input',
}

type Props = {
  renderItem?: React.ElementType;
  renderOption?: React.ElementType;
  options?: any[];
  value?: any[];
  view?: VIEW;
  label?: string;
}

type LabelComponentProps = {
  label?: string;
  view?: VIEW;
  children: React.ReactNode;
  onClick?: () => void;
};

const Multiselect = ({ view, label, renderItem, renderOption, value, options }: Props) => {
  const [isEdit, setIsEdit] = useBoolean();

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useOutsideClick({
    ref: containerRef,
    handler: () => setIsEdit.off(),
  });

  const styleInput = useMemo(() => {
    if(view === VIEW.INPUT){
      return {
        borderColor: 'input.outline',
        borderWidth: 1,
        borderRadius: 7,
      };
    }
    return undefined;
  }, [view]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [isEdit]);

  console.log(containerRef.current?.offsetHeight);

  return (
    <LabelComponent
      view={view}
      label={label}
      onClick={() => setIsEdit.on()}
    >
      <VStack
        position={'relative'}
        width={'full'}
        gap={0}
      >
        <Grid
          ref={containerRef}
          width={'full'}
          templateColumns="repeat(auto-fit, minmax(100px, 1fr))"
          gap={1}
          padding={1}
          sx={{
            ...styleInput,
            cursor: isEdit ? 'pointer' : 'default',
            backgroundColor: isEdit ? 'background.fill' : 'background.switch',
            boxShadow: isEdit ? 'rgba(0, 0, 0, 0.24) 0px 3px 8px' : 'none',
            borderRadius: isEdit ? '5px' : 'unset',
            transition: 'background .3s ease',
          }}
        >
          {options?.map((item, index) => {
            const Component = renderItem;
            return Component ? (
              <Component
                key={index}
                item={item}
              />
            ) : null;
          })}

          {
            isEdit ? (
              <Input
                ref={inputRef}
                variant={'unstyled'}
                maxW={'full'}
                width={'min-content'}
                minW={10}
                size={'xs'}
                paddingY={1}
              />
            ) : null
          }
        </Grid>
        <Collapse
          in={isEdit}
          animateOpacity
        >
          <List
            variant={'selectList'}
            // top={containerHeight}
            maxH={'200px'}
            overflow={'auto'}
          >
            {
              options?.map((item, index) => {
                const Component = renderOption;
                return Component ? (
                  <Component
                    key={index}
                    item={item}
                    onClick={() => null}
                  />
                ) : null;
              })
            }
          </List>
        </Collapse>
      </VStack>
    </LabelComponent>
  );
};

const LabelComponent = ({ view, children, label, onClick }: LabelComponentProps) => {
  if (view === VIEW.LIST) {
    return (
      <HStack
        width={'full'}
        whiteSpace={'nowrap'}
        align={'start'}
        flex={1}
        gap={4}
        onClick={onClick}
      >
        <HStack
          color={'text.pale'}
          paddingY={1}
        >
          <BsPeople />
          <Text>{label}</Text>
        </HStack>
        {children}
      </HStack>
    );
  } else {
    return (
      <VStack>
        <Text>{label}</Text>
        {children}
      </VStack>
    );
  }
};

export default Multiselect;
