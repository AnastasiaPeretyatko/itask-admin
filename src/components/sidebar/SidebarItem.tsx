import { Button } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'

type Props = {
  data: {
    title: string
    icon: React.JSX.Element
    path?: string
  }
}

const SidebarItem = ({ data }: Props) => {
  const router = useRouter()
  return (
    <Button
      variant="sidebarBtn"
      leftIcon={data.icon}
      onClick={() => data.path && router.push(data.path)}
    >
      {data.title}
    </Button>
  )
}

export default SidebarItem
