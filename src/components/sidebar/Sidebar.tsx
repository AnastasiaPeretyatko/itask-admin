import { HStack, IconButton, Text, VStack } from '@chakra-ui/react'
import { useEffect } from 'react'
import { BsHouse, BsPeople } from 'react-icons/bs'
import SidebarItem from './SidebarItem'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store/store'
import { changeStateSidebar } from '@/store/user-setting/setting.slice'
import { Hamburger } from '../customeIcon'

const Sidebar_Item = {
  menu: [
    { title: 'Home', icon: <BsHouse />, path: '/' },
    { title: 'Professors', icon: <BsPeople />, path: '/professors' },
    { title: 'Groups', icon: <BsPeople />, path: '/groups' },
  ],
}

const Sidebar = () => {
  const { isOpenSidebar } = useSelector(
    (state: RootState) => state.userSettings
  )
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    console.log('isOpenSidebar', isOpenSidebar)
  }, [isOpenSidebar])
  return (
    <VStack width={'100%'} align={'start'}>
      <HStack
        width={'100%'}
        paddingY={4}
        justify={isOpenSidebar ? 'space-between' : 'center'}
      >
        <Text
          color={'primary.purple'}
          fontWeight={600}
          whiteSpace={'nowrap'}
          sx={{
            display: isOpenSidebar ? 'block' : 'none',
          }}
        >
          ITASK | Admin
        </Text>
        <IconButton
          aria-label="Hamburger menu"
          icon={<Hamburger />}
          variant={'unstyled'}
          width={'min-content'}
          height={'min-content'}
          onClick={() => dispatch(changeStateSidebar(!isOpenSidebar))}
        />
      </HStack>
      {Sidebar_Item.menu.map(item => (
        <SidebarItem
          key={item.title}
          data={item}
          isCollapse={!!isOpenSidebar}
        />
      ))}
    </VStack>
  )
}

export default Sidebar
