import { Box, Flex, HStack, VStack } from '@chakra-ui/react'
import React from 'react'
import Sidebar from '../Sidebar'
import Header from '../Header'

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <VStack w="full" height="100vh" gap={0} overflow={'hidden'}>
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
          backgroundColor={'background.fill'}
        >
          <Header />
          <Box paddingX={4} width={'full'}>{children}</Box>
        </Flex>
      </HStack>
    </VStack>
  )
}

export default AppLayout
