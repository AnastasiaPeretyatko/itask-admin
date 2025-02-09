import { createAction } from '@/actions'
import { AddIcon } from '@chakra-ui/icons'
import CreateStudent from '@/features/students/components/CreateStudent'
import { TStudent } from '@/types/student'
import EditStudent from '@/features/students/components/EditStudent'

export const addStudent = createAction({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  name: ({ t }: { t: any }) => t('Add student'),
  icon: AddIcon,
  actionLabel: 'Add student',
  children: (onClose: () => void) => ({
    title: 'Add student',
    content: <CreateStudent onClose={onClose} />,
  }),
})

export const updateStudent = (data: TStudent) =>
  createAction({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    name: ({ t }: { t: any }) => t('Update student'),
    icon: AddIcon,
    actionLabel: 'Update student',
    children: (onClose: () => void) => ({
      title: 'Update student',
      content: <EditStudent onClose={onClose} student={data} />,
    }),
  })

export const deleteStudent = () =>
  createAction({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    name: ({ t }: { t: any }) => t('Delete student'),
    icon: AddIcon,
    actionLabel: 'Delete student',
    children: (onClose: () => void) => ({
      title: 'Delete student',
      content: (
        <div>
          <p>Are you sure you want to delete this student?</p>
          <button onClick={onClose}>No</button>
        </div>
      ),
    }),
    isDeleted: true,
    isDisabled: true,
  })
