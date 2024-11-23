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
import { useRef } from 'react'
import Label from './Label'

type Props<T> = {
  label?: string
  size?: number
  enumObject: T
  currentValue: keyof T
  onChangeValue: (value: keyof T) => void;
}

const SelectorGroupInput = <T extends Record<string, string>>({
  size,
  label,
  enumObject,
  currentValue,
  onChangeValue,
}: Props<T>) => {
  const ref = useRef(null)
  const { isOpen, onToggle, onClose } = useDisclosure()

  useOutsideClick({
    ref: ref,
    handler: () => onClose(),
  })

  const onChangeState = (key: keyof T) => {
    onChangeValue(key)
    onToggle()
  }

  const enumArray = Object.entries(enumObject).map(([key, title]) => ({
    key: key as keyof T,
    title,
  }))

  return (
    <>
      <Container
        width={size || 'full'}
        position={'relative'}
        ref={ref}
        zIndex={2}
        padding={0}
      >
        <Container
          variant={'selectorLine'}
          bgGradient={
            isOpen ? 'linear(to-r, SECONDARY_BLUE, PRIMARY_PURPLE)' : 'none'
          }
        >
          <Container variant={'selector'} onClick={onToggle}>
            {label && <Label text={label} isFocus />}
            <HStack>
              <Text>{enumObject[currentValue]}</Text>
            </HStack>
            <Icon as={isOpen ? ChevronUpIcon : ChevronDownIcon} />
          </Container>
        </Container>

        <Collapse in={isOpen} animateOpacity>
          <List variant={'selectList'}>
            {enumArray.map(({ key, title }) => (
                <ListItem
                  display={'flex'}
                  flexDir={'row'}
                  alignItems={'center'}
                  gap={2}
                  key={Math.random()}
                  onClick={() => onChangeState(key)}
                >
                  {title}
                </ListItem>
              ))}
          </List>
        </Collapse>
      </Container>
    </>
  )
}

export default SelectorGroupInput