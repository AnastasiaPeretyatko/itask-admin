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

const BreadcrumbUI = () => {
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

      <BreadcrumbItem isCurrentPage>
        <BreadcrumbLink>{t(path)}</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  )
}

export default BreadcrumbUI
