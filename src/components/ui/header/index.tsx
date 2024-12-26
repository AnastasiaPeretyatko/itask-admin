import { BellIcon, CalendarIcon } from '@chakra-ui/icons'
import {
  Avatar,
  Container,
  Heading,
  HStack,
  IconButton,
  Text,
} from '@chakra-ui/react'
import UserSettingPopover from '../user-settings-popover'

const Header = () => {
  return (
    <Container variant={'header'}>
      <Heading size={'md'} color={'primary.purple'}>
        ITASK | Admin
      </Heading>
      <HStack>
        <IconButton
          variant={'unstyled'}
          aria-label="notify"
          icon={<CalendarIcon boxSize={4} />}
        />
        <IconButton
          variant={'unstyled'}
          aria-label="notify"
          icon={<BellIcon boxSize={5} />}
        />
        <UserSettingPopover>
          <HStack cursor={'pointer'}>
            <Text fontWeight={600}>Ivan Ivanov</Text>
            <Avatar size={'sm'} />
          </HStack>
        </UserSettingPopover>
      </HStack>
    </Container>
  )
}

export default Header
