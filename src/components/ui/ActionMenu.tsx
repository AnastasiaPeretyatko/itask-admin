import {
  ComponentWithAs,
  IconButton,
  IconProps,
  Menu,
  // Menu,
  MenuButton,
  MenuList,
} from '@chakra-ui/react'
import React from 'react'
import { CiMenuKebab } from 'react-icons/ci'
import WindowModal from '../modal/WindowModal'
import { useTranslations } from 'next-intl'
import CustomMenuItem from './CustomMenuItem'

type ModalAction = {
  title: string // Заголовок модального окна
  actionLabel: string // Текст в пункте меню
  icon?: ComponentWithAs<'svg', IconProps> // Иконка для пункта меню
  modalBody: (onClose: () => void) => React.ReactNode // Тело модального окна
  isDelete?: boolean // Флаг, чтобы обозначить удаление (дополнительный стиль)
  isDisabled?: boolean // Флаг для отключения пункта
}

type ActionMenuProps = {
  actions: ModalAction[] // Список модальных окон
}

const ActionMenu = ({ actions }: ActionMenuProps) => {
  const t = useTranslations()
  return (
    // <div>kek</div>
    <Menu size={'sm'}>
      <MenuButton
        as={IconButton}
        icon={<CiMenuKebab />}
        variant={'unstyled'}
        display={'flex'}
        justifyContent={'center'}
      />
      <MenuList>
        {actions.map(action => (
          <WindowModal
            key={action.title}
            // title={action.title}
            action={
              <CustomMenuItem
                icon={action.icon}
                label={t(action.actionLabel)}
                isDelete={action.isDelete}
                isDisabled={action.isDisabled}
              />
            }
          >
            {onClose => action.modalBody(onClose)}
          </WindowModal>
          // <WindowModal
          //   key={action.title}
          //   title={action.title}
          //   action={
          //     <CustomMenuItem
          //       icon={action.icon}
          //       label={t(action.actionLabel)}
          //       isDelete={action.isDelete}
          //       isDisabled={action.isDisabled}
          //     />
          //   }
          //   modalBody={onClose => }
          // />
        ))}
        {/* <WindowModal
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
        /> */}
      </MenuList>
    </Menu>
  )
}

export default ActionMenu
