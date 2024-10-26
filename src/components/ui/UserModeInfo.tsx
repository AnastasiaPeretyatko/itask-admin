import { Avatar, HStack, IconButton, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { BsBoxArrowLeft } from 'react-icons/bs'

const UserModeInfo = () => {
  return (
    <HStack width="100%" gap={3} justify={'space-between'}>
      <Avatar name="Иванов Иван" />
      <VStack gap={0} align={'start'} flex={1}>
        <Text>Иванов Иван</Text>
        <Text fontSize={'sm'}>ivan@gmail.com</Text>
      </VStack>
      <IconButton variant='unstyled' fontSize={'xl'} aria-label="logout" icon={<BsBoxArrowLeft />} />
    </HStack>
  )
}

export default UserModeInfo
