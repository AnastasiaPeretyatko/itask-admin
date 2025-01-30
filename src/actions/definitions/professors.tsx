import { createAction } from '@/actions'
import CreateProfessor from '@/features/professors/components/modal/CreateProfessor'
import { AddIcon } from '@chakra-ui/icons'

export const addProfessor = createAction({
  name: ({ t }: { t: any }) => t('Add professor'),
  icon: AddIcon,
  actionLabel: 'Add professor',
  children: ({ onClose }: { onClose: () => void }) => ({
    title: "Add professor",
    content: (
      <CreateProfessor onClose={onClose} />
    )
  }),
})
