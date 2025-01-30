import { IconButton, Menu, MenuButton, MenuList } from '@chakra-ui/react'
import { CiMenuKebab } from 'react-icons/ci'
import WindowModal from '../modal/WindowModal'
import CustomMenuItem from './CustomMenuItem'
import { useTranslations } from 'next-intl'

type ActionMenuProps = {
  actions: any[] // Список модальных окон
}

const ActionMenu = ({ actions }: ActionMenuProps) => {
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
        {actions.map(action => {
          return (
            <WindowModal
              key={action.id}
              action={
                <CustomMenuItem icon={action.icon} label={action.actionLabel} />
              }
              body={onClose => action.children(onClose).content}
            />
          )
        })}
      </MenuList>
    </Menu>
  )
}

export default ActionMenu
