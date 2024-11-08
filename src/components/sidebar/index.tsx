import {
  Container,
  Divider,
  Heading,
  HStack,
  IconButton,
  Text,
  VStack,
} from '@chakra-ui/react'
import ColorModeButton from '../ui/ColorModeButton'
import { BsGear, BsHouse, BsPeople } from 'react-icons/bs'
import SidebarItem from './SidebarItem'
import { useEffect, useState } from 'react'
import { HamburgerIcon } from '@chakra-ui/icons'

const Sidebar_Item = {
  menu: [
    { title: 'Home', icon: <BsHouse />, path: '/' },
    { title: 'Professors', icon: <BsPeople />, path: '/professors' },
  ],
  settings: [{ title: 'Setting', icon: <BsGear /> }],
}

const Sidebar = () => {
  const [isCollapse, setIsCollapse] = useState<boolean>(false)

  const onChangeStatusCollapse = () => {
    localStorage.setItem('sidebar', String(!isCollapse))
    setIsCollapse(!isCollapse)
  }

  useEffect(() => {
    //TODO решить проблему с дерганием между вкладками
    setIsCollapse(!!localStorage.getItem('sidebar'))
  }, [])

  return (
    <Container
      variant="sidebar"
      width={isCollapse ? 'min-content' : '256px'}
      transition="ease-in-out .5s"
    >
      <HStack
        paddingY={6}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Heading size={'sm'} color={'PRIMARY_PURPLE'}>
          {isCollapse ? 'I' : 'ITASK | ADMIN'}
        </Heading>
        <IconButton
          variant={'unstyled '}
          aria-label="HamburgerIcon"
          icon={<HamburgerIcon />}
          onClick={onChangeStatusCollapse}
        />
      </HStack>
      <Divider />
      <VStack align={'start'} flex={1} paddingY={4} paddingLeft={4}>
        <Text fontSize={'sm'} color={'text.pale'}>
          Menu
        </Text>
        {Sidebar_Item.menu.map(el => (
          <SidebarItem key={el.title} data={el} isCollapse={isCollapse} />
        ))}
        <Divider />
        {Sidebar_Item.settings.map(el => (
          <SidebarItem key={el.title} data={el} isCollapse={isCollapse} />
        ))}
      </VStack>
      <VStack width="100%" padding={4} gap={4}>
        <ColorModeButton isCollapse={isCollapse} />
        {/* <UserModeInfo /> */}
      </VStack>
    </Container>
  )
}

export default Sidebar
