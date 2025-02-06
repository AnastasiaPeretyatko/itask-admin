import { IconButton, Menu, MenuButton, MenuList } from '@chakra-ui/react';
import { CiMenuKebab } from 'react-icons/ci';
import WindowModal from '../modal/WindowModal';
import CustomMenuItem from './CustomMenuItem';
import { createActionType } from '@/actions/definitions/professors';
import { TProfessor } from '@/types/professor';

type ActionMenuProps = {
  actions: (el: TProfessor) => createActionType[] // Список модальных окон
  data?: TProfessor
}

const ActionMenu = ({ actions, data }: ActionMenuProps) => {
  const listActions = data && actions(data);
  // const t = useTranslations()

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
        {listActions?.map((action) => {
          console.log(action);
          return (
            <WindowModal
              key={action.id}
              action={
                <CustomMenuItem
                  icon={action.icon}
                  label={action.actionLabel}
                  isDelete={action.isDeleted}
                  isDisabled={action.isDesabled}
                />
              }
              body={(onClose) => action.children(onClose).content}
            />
          );
        })}
      </MenuList>
    </Menu>
  );
};

export default ActionMenu;
