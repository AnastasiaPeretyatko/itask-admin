import { createAction } from '@/actions'
import CreateProfessor from '@/features/professors/components/modal/CreateProfessor'
import EditProfessor from '@/features/professors/components/modal/EditProfessor'
import { TProfessor } from '@/types/professor'
import { AddIcon, ComponentWithAs, IconProps } from '@chakra-ui/icons'

export type createActionType = {
  id?: string
  name: (data: any) => string
  icon: ComponentWithAs<'svg', IconProps>
  actionLabel: string
  children: (onClose: () => void) => {
    title: string
    content: JSX.Element
  }
}

export const addProfessor = createAction({
  name: ({ t }: { t: any }) => t('Add professor'),
  icon: AddIcon,
  actionLabel: 'Add professor',
  children: (onClose: () => void) => ({
    title: 'Add professor',
    content: <CreateProfessor onClose={onClose} />,
  }),
})

export const updateProfessor = (data: TProfessor) =>
  createAction({
    name: ({ t }: { t: any }) => t('Update professor'),
    icon: AddIcon,
    actionLabel: 'Update professor',
    children: (onClose: () => void) => ({
      title: 'Update professor',
      content: <EditProfessor professor={data} onClose={onClose} />,
    }),
  })
