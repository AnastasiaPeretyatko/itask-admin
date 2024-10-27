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
import { useRef, useState } from 'react'
import Label from './Label'

type Props = {
  label?: string
  size?: string
}

const SELECT = ['Figma', 'Photoshop', 'In disign']

const SelectorInput = ({ label }: Props) => {
  const ref = useRef(null)
  const { isOpen, onToggle, onClose } = useDisclosure()
  const [value, setValue] = useState<string>(SELECT[0])

  useOutsideClick({
    ref: ref,
    handler: () => onClose(),
  })

  const onChangeState = (item: string) => {
    setValue(item)
    onToggle()
  }

  return (
    <>
      <Container width={'100%'} position={'relative'} ref={ref} zIndex={1}>
        <Container
          variant={'selectorLine'}
          bgGradient={
            isOpen ? 'linear(to-r, SECONDARY_BLUE, PRIMARY_PURPLE)' : 'none'
          }
        >
          <Container variant={'selector'} onClick={onToggle}>
            {label && <Label text={label} isFocus />}
            <Text>{value}</Text>
            <Icon as={isOpen ? ChevronUpIcon : ChevronDownIcon} />
          </Container>
        </Container>

        <Collapse in={isOpen} animateOpacity>
          <List variant={'selectList'}>
            {SELECT.map(item => (
              <ListItem key={Math.random()} onClick={() => onChangeState(item)}>
                {item}
              </ListItem>
            ))}
          </List>
        </Collapse>
      </Container>
    </>
  )
}

export default SelectorInput
