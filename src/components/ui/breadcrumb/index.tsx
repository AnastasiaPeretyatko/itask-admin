import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  IconButton,
} from '@chakra-ui/react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'
import { BsHouse } from 'react-icons/bs'

type Props ={
  options?: string[]
}


const BreadcrumbUI = ({ options }: Props) => {
  const router = useRouter()
  const t = useTranslations()

  const path = useMemo(() => {
    const rest = router.pathname.split('/')[1]
    return rest[0].toUpperCase() + rest.slice(1)
  }, [router.pathname])

  return (
    <Breadcrumb mb={4}>
      <BreadcrumbItem>
        <BreadcrumbLink
          variant={'unstyledBtn'}
          as={IconButton}
          icon={<BsHouse />}
          onClick={() => router.push('/')}
        />
      </BreadcrumbItem>

      <BreadcrumbItem isCurrentPage={!router.query.id}>
        <BreadcrumbLink>{t(path)}</BreadcrumbLink>
      </BreadcrumbItem>

      {options?.map((item, index) => (
        <BreadcrumbItem key={index}>
          <BreadcrumbLink>{item}</BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  )
}

export default BreadcrumbUI
