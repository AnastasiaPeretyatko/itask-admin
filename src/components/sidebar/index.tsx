import { Container, Divider, Heading, Text, VStack } from '@chakra-ui/react'
import ColorModeButton from '../ui/ColorModeButton'
import { BsGear, BsHouse } from 'react-icons/bs'
import SidebarItem from './SidebarItem'
import UserModeInfo from '../ui/UserModeInfo'

const Sidebar_Item = {
  menu: [
    { title: 'Home', icon: <BsHouse />, path: '/' },
    { title: 'Professors', icon: <BsHouse />, path: '/professors' },
  ],
  settings: [{ title: 'Setting', icon: <BsGear /> }],
}

const Sidebar = () => {
  return (
    <Container variant="sidebar">
      <VStack align={'start'} padding={4}>
        <Heading size={'md'}>ITASK | ADMIN</Heading>
      </VStack>
      <VStack align={'start'} flex={1} padding={4}>
        <Text fontSize={'sm'} color={'text.pale'}>
          Menu
        </Text>
        {Sidebar_Item.menu.map(el => (
          <SidebarItem key={el.title} data={el} />
        ))}
        <Divider />
        {Sidebar_Item.settings.map(el => (
          <SidebarItem key={el.title} data={el} />
        ))}
      </VStack>
      <VStack width="100%" padding={4} gap={4}>
        <ColorModeButton />
        <UserModeInfo />
      </VStack>
    </Container>
  )
}

export default Sidebar
