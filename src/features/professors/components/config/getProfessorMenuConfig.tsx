import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import React from 'react'
import EditProfessor from '../../professors/modal/EditProfessor';
import { TProfessor } from '@/types/professor';

export const getProfessorsMenuConfig = (professor: TProfessor) => [
  {
    title: 'Edit',
    actionLabel: 'Edit',
    icon: EditIcon,
    modalBody: (onClose: () => void) => (
      <EditProfessor onClose={onClose} professor={professor}/>
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