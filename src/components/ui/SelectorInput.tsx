import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import {
  Collapse,
  Container,
  HStack,
  Icon,
  Image,
  List,
  ListItem,
  Text,
  useDisclosure,
  useOutsideClick,
} from '@chakra-ui/react'
import { useRef } from 'react'
import Label from './Label'
import { SelectArrayType } from '@/assets/language'

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
      <Container
        width={size || 'full'}
        position={'relative'}
        ref={ref}
        zIndex={1}
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
              {array.find(el => el.value === currentValue)?.icon && (
                <Image
                  alt="iamge"
                  src={array.find(el => el.value === currentValue)?.icon}
                  width={5}
                />
              )}
              <Text>
                {array.find(el => el.value === currentValue)?.title ||
                  array[0].title}
              </Text>
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
                  {item.icon && (
                    <Image alt="iamge" src={`/${item.value}.png`} width={4} height={4} />
                  )}
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
