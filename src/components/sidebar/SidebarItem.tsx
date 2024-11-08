import { Button, Tooltip } from '@chakra-ui/react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/router'
import React from 'react'

type Props = {
  data: {
    title: string
    icon: React.JSX.Element
    path?: string
  }
  isCollapse: boolean
}

const SidebarItem = ({ data, isCollapse }: Props) => {
  const t = useTranslations()
  const router = useRouter()

  return (
    <>
      {isCollapse ? (
        <Tooltip label={data.title} placement="right">
          <Button
            variant="sidebarBtn"
            leftIcon={data.icon}
            onClick={() => data.path && router.push(data.path)}
            isActive={router.asPath === data.path}
          ></Button>
        </Tooltip>
      ) : (
        <Button
          variant="sidebarBtn"
          leftIcon={data.icon}
          onClick={() => data.path && router.push(data.path)}
          isActive={router.asPath === data.path}
        >
          {!isCollapse && t(data.title)}
        </Button>
      )}
    </>
  )
}

export default SidebarItem
