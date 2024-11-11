import { Flex, HStack, VStack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import Header from '../header'
import Sidebar from '../sidebar/Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store/store'
import { changeStateSidebar } from '@/store/user-setting/setting.slice'

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const { isOpenSidebar } = useSelector(
    (state: RootState) => state.userSettings
  )
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (isOpenSidebar === null) {
      dispatch(changeStateSidebar(!!localStorage.getItem('sidebar') || true))
    }
  }, [dispatch, isOpenSidebar])

  return (
    <HStack w="full" h="100vh">
      <Flex
        as="aside"
        w="full"
        h="full"
        bg="background.main"
        maxW={!!isOpenSidebar ? 200 : 70}
        alignItems="center"
        padding={4}
        flexDir="column"
        transition="ease-in-out .2s"
      >
        <Sidebar />
      </Flex>
      <VStack
        as="main"
        w="full"
        h="full"
        overflow="auto"
        flexDirection="column"
        align="start"
      >
        <Header />
        {children}
      </VStack>
    </HStack>
  )
}

export default AppLayout
