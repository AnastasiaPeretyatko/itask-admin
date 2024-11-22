import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import {
  Collapse,
  Container,
  HStack,
  Icon,
  List,
  ListItem,
  Text,
  useDisclosure,
  useOutsideClick,
} from '@chakra-ui/react'
import React, { useRef } from 'react'
import Label from './Label'

type Props = {
  size?: number
  label?: string
  currentValue?: string | number
  onChangeValue: (value: string | number) => void
  array: string[] | number[]
  isDisabled?: boolean
}

const SelectUI = ({
  array,
  size,
  label,
  currentValue = '',
  onChangeValue,
  isDisabled = false,
}: Props) => {
  const ref = useRef(null)
  const { isOpen, onToggle, onClose } = useDisclosure()

  useOutsideClick({
    ref: ref,
    handler: () => onClose(),
  })

  const onChangeState = (item: string | number) => {
    onChangeValue(item)
    onToggle()
  }

  return (
    <Container
      width={size || 'full'}
      position={'relative'}
      ref={ref}
      zIndex={1}
      padding={0}
      m={0}
      cursor={isDisabled ? 'not-allowed' : 'pointer'}
      sx={isDisabled ? { opacity: 0.7 } : {}}
    >
      <Container
        variant={'selectorLine'}
        bgGradient={
          isOpen ? 'linear(to-r, SECONDARY_BLUE, PRIMARY_PURPLE)' : 'none'
        }
      >
        <Container
          variant={'selector'}
          onClick={() => {
            if (!isDisabled) onToggle()
          }}
        >
          {label && <Label text={label} isFocus />}
          <HStack>
            <Text>{array.find(el => el === currentValue) || array[0]}</Text>
          </HStack>

          <Icon as={isOpen ? ChevronUpIcon : ChevronDownIcon} />
        </Container>
      </Container>

      <Collapse in={isOpen} animateOpacity>
        <List variant={'selectList'}>
          {array &&
            array.map(item => (
              <ListItem
                display={'flex'}
                flexDir={'row'}
                alignItems={'center'}
                gap={2}
                key={Math.random()}
                onClick={() => onChangeState(item)}
              >
                {item}
              </ListItem>
            ))}
        </List>
      </Collapse>
    </Container>
  )
}

export default SelectUI
