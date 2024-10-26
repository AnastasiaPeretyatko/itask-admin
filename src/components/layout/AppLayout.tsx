import { Box, Button, HStack } from '@chakra-ui/react'
import React from 'react'
import Sidebar from '../sidebar'

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <HStack>
      <Sidebar />
      <Box flex={1}>{children}</Box>
    </HStack>
  )
}

export default AppLayout
