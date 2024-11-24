import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import React from 'react'
import { TStudent } from '@/types/student';
import EditStudent from '../modal/EditStudent';

export const getStudentsMenuConfig = (students: TStudent) => [
  {
    title: 'Edit',
    actionLabel: 'Edit',
    icon: EditIcon,
    modalBody: (onClose: () => void) => (
      <EditStudent onClose={onClose} student={students}/>
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
];