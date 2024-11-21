import { Button, Container, HStack } from '@chakra-ui/react'
import React from 'react'
import ViewTableStudents from './ViewTableStudents'
import SearchInput from '@/components/ui/SearchInput'
import WindowModal from '@/components/modal/WindowModal'
import CreateStudent from './modal/CreateStudent'
import { useTranslations } from 'next-intl'

const SectionViewStudents = () => {
  const t = useTranslations()
  return (
    <Container variant={'wrapper_table'}>
      <HStack mb={4} justifyContent="space-between">
        <SearchInput
          onClearSearchInput={() => {}}
          onChange={() => {}}
          value={''}
          size='sm'
        />
        <WindowModal
          title={t("Create student")}
          modalBody={onClose => <CreateStudent onClose={onClose} />}
        />
      </HStack>
      <ViewTableStudents />
    </Container>
  )
}

export default SectionViewStudents
