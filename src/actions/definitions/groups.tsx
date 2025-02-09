import { TGroup } from '@/types/groups';
import { createAction } from '..';
import { AddIcon } from '@chakra-ui/icons';
import CreateGroup from '@/features/groups/components/CreateGroup';
import EditGroup from '@/features/groups/components/EditGroup';

export const createGroup = createAction({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    name: ({ t }: { t: any }) => t('Create group'),
    icon: AddIcon,
    actionLabel: 'Create group',
    children: (onClose: () => void) => ({
      title: 'Create group',
      content: <CreateGroup onClose={onClose} />,
    }),
  });

export const updateGroup = (data: TGroup) => createAction({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  name: ({ t }: { t: any }) => t('Update group'),
  icon: AddIcon,
  actionLabel: 'Update group',
  children: (onClose: () => void) => ({
    title: 'Update group',
    content: <EditGroup onClose={onClose} group={data} />,
  }),
});

export const deleteGroup = () => createAction({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  name: ({ t }: { t: any }) => t('Delete group'),
  icon: AddIcon,
  actionLabel: 'Delete group',
  children: (onClose: () => void) => ({
    title: 'Delete group',
    content: <div>
      <p>Are you sure you want to delete this group?</p>
      <button onClick={onClose}>No</button>
    </div>,
  }),
  isDeleted: true,
  isDisabled: true,
});