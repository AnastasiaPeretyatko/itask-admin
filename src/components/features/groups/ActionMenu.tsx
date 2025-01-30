import { IconButton, Menu, MenuButton, MenuList } from '@chakra-ui/react'
import React from 'react'
import { CiMenuKebab } from 'react-icons/ci'
import WindowModal from '@/components/modal/WindowModal'
import EditGroup from './modal/EditGroup'
import { useTranslations } from 'next-intl'
import { TGroup } from '@/types/groups'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import CustomMenuItem from '@/components/ui/CustomMenuItem'

const ActionMenu = ({ group }: { group: TGroup }) => {
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
        {/* <WindowModal
          title="Edit group"
          action={<CustomMenuItem icon={EditIcon} label={t('Edit')} />}
          modalBody={onClose => <EditGroup group={group} onClose={onClose} />}
        /> */}
        <CustomMenuItem
          isDisabled
          isDelete
          icon={DeleteIcon}
          label={t('Delete')}
        />
      </MenuList>
    </Menu>
  )
}

export default ActionMenu
