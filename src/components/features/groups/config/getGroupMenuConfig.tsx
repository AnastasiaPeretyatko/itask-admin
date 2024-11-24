import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import EditGroup from '../modal/EditGroup'
import { TGroup } from '@/types/groups'

export const getGroupMenuConfig = (group: TGroup) => [
  {
    title: 'Edit',
    actionLabel: 'Edit',
    icon: EditIcon,
    modalBody: (onClose: () => void) => (
      <EditGroup onClose={onClose} group={group} />
    ),
    isDelete: false,
    isDisabled: false,
  },
  {
    title: 'Delete',
    actionLabel: 'Delete',
    icon: DeleteIcon,
    modalBody: (onClose: () => void) => (
      <div>
        <p>Are you sure you want to delete this professor?</p>
        <button onClick={onClose}>No</button>
      </div>
    ),
    isDelete: true,
    isDisabled: true,
  },
]
