import { AddIcon, ComponentWithAs, DeleteIcon, IconProps } from '@chakra-ui/icons';
import { createAction } from '@/actions';
import CreateProfessor from '@/features/professors/components/CreateProfessor';
import EditProfessor from '@/features/professors/components/EditProfessor';
import { TProfessor } from '@/types/professor';

export type createActionType = {
  id?: string
  name: (data: any) => string
  icon: ComponentWithAs<'svg', IconProps>
  actionLabel: string
  children: (onClose: () => void) => {
    title: string
    content: JSX.Element
  }
  isDeleted?: boolean
  isDesabled?: boolean
}

export const addProfessor = createAction({
  name: ({ t }: { t: any }) => t('Add professor'),
  icon: AddIcon,
  actionLabel: 'Add professor',
  children: (onClose: () => void) => ({
    title: 'Add professor',
    content: <CreateProfessor onClose={onClose} />,
  }),
});

export const updateProfessor = (data: TProfessor) =>
  createAction({
    name: ({ t }: { t: any }) => t('Update professor'),
    icon: AddIcon,
    actionLabel: 'Update professor',
    children: (onClose: () => void) => ({
      title: 'Update professor',
      content: <EditProfessor
        professor={data}
        onClose={onClose}
      />,
    }),
  });

export const deleteProfessor = (data: TProfessor) =>
  createAction({
    name: ({ t }: { t: any }) => t('Delete professor'),
    icon: DeleteIcon,
    actionLabel: 'Delete professor',
    children: (onClose: () => void) => ({
      title: 'Delete professor',
      content: <div>
        <p>Are you sure you want to delete this professor?</p>
        <button onClick={onClose}>No</button>
      </div>,
    }),
    isDeleted: true,
    isDesabled: true,
  });