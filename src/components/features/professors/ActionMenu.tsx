import { IconButton, Menu, MenuButton, MenuList } from '@chakra-ui/react'
import React from 'react'
import { CiMenuKebab } from 'react-icons/ci'
import WindowModal from '../../modal/WindowModal'
import { useTranslations } from 'next-intl'
import { TProfessor } from '@/types/professor'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import CustomMenuItem from '../../ui/CustomMenuItem'
import EditProfessor from './modal/EditProfessor'

const ActionMenu = ({ professor }: { professor: TProfessor }) => {
  const t = useTranslations()
  return (
    <Menu size={'sm'}>
      <MenuButton
        as={IconButton}
        icon={<CiMenuKebab />}
        variant={'unstyled'}
        display={'flex'}
        justifyContent={'center'}
      />
      <MenuList>
        <WindowModal
          title="Edit professor"
          action={<CustomMenuItem icon={EditIcon} lable={t('Edit')} />}
          modalBody={onClose => (
            <EditProfessor professor={professor} onClose={onClose} />
          )}
        />
        <CustomMenuItem
          isDisabled
          isDelete
          icon={DeleteIcon}
          lable={t('Delete')}
        />
      </MenuList>
    </Menu>
  )
}

export default ActionMenu
