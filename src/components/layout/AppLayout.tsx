import { Flex, HStack, VStack } from '@chakra-ui/react'
import React from 'react'
import Sidebar from '../ui/sidebar/Sidebar'
import Header from '../ui/header'

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <VStack w="full" height="100vh" gap={0} overflow={'hidden'}>
      <Header />
      <HStack
        width={'100%'}
        maxH={'full'}
        h={'full'}
        overflow={'hidden'}
        gap={0}
      >
        <Sidebar />
        <Flex
          as={'main'}
          w="100%"
          h="full"
          alignItems="start"
          justifyContent="start"
          flexDir="column"
          overflowY="auto"
          p={2}
          bg={'gray.100'}
        >
          {children}
        </Flex>
      </HStack>
    </VStack>
  )
}

export default AppLayout
