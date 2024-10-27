import { Box, Button, Flex, HStack } from '@chakra-ui/react'
import React from 'react'
import Sidebar from '../sidebar'

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <HStack height={'100%'} align={'start'} gap={1}>
      <Sidebar />
      <Flex
        flexDir={'column'}
        align={'start'}
        height={'100%'}
        flex={1}
        padding={4}
      >
        {children}
      </Flex>
    </HStack>
  )
}

export default AppLayout
