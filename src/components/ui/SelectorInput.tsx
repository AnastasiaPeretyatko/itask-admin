import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import {
  Collapse,
  Container,
  Icon,
  List,
  ListItem,
  Text,
  useDisclosure,
  useOutsideClick,
} from '@chakra-ui/react'
import { useRef } from 'react'
import Label from './Label'
import { SelectArrayType } from '@/common/assets/language'

type Props = {
  label?: string
  size?: number
  array: SelectArrayType[]
  currentValue: string | undefined
  onChangeValue: (value: string) => void
}

const SelectorInput = ({
  size,
  label,
  array,
  currentValue = '',
  onChangeValue,
}: Props) => {
  const ref = useRef(null)
  const { isOpen, onToggle, onClose } = useDisclosure()

  useOutsideClick({
    ref: ref,
    handler: () => onClose(),
  })

  const onChangeState = (item: SelectArrayType) => {
    onChangeValue(item.value)
    onToggle()
  }

  return (
    <>
      <Container width={size || 'full'} position={'relative'} ref={ref} zIndex={1}>
        <Container
          variant={'selectorLine'}
          bgGradient={
            isOpen ? 'linear(to-r, SECONDARY_BLUE, PRIMARY_PURPLE)' : 'none'
          }
        >
          <Container variant={'selector'} onClick={onToggle}>
            {label && <Label text={label} isFocus />}
            <Text>
              {array.find(el => el.value === currentValue)?.title ||
                array[0].title}
            </Text>
            <Icon as={isOpen ? ChevronUpIcon : ChevronDownIcon} />
          </Container>
        </Container>

        <Collapse in={isOpen} animateOpacity>
          <List variant={'selectList'}>
            {array &&
              array.map(item => (
                <ListItem
                  key={Math.random()}
                  onClick={() => onChangeState(item)}
                >
                  {item.title}
                </ListItem>
              ))}
          </List>
        </Collapse>
      </Container>
    </>
  )
}

export default SelectorInput
