import { Button } from '@chakra-ui/react';
import React from 'react'

type Props = {
  data: {
    title: string,
    icon: React.JSX.Element
  }
}

const SidebarItem = ({ data }: Props) => {
  return (
    <Button variant='sidebarBtn' leftIcon={data.icon}>{data.title}</Button>
  )
}

export default SidebarItem