import { BellIcon, CalendarIcon } from '@chakra-ui/icons'
import { Avatar, Container, HStack, IconButton, Text } from '@chakra-ui/react'
import UserSettingPopover from '../ui/user-settings-popover'

const Header = () => {
  return (
    <Container variant={'header'}>
      <HStack>
        <IconButton
          variant={'unstyled'}
          color={'text.pale'}
          aria-label="notify"
          icon={<CalendarIcon boxSize={5} />}
        />
        <IconButton
          variant={'unstyled'}
          color={'text.pale'}
          aria-label="notify"
          icon={<BellIcon boxSize={6} />}
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
