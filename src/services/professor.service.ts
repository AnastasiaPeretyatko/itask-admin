import { TProfessor, TProfessorCreate } from '@/types/professor'
import { http } from '.'
import { TParams } from '@/store/professors/professors.slice'

export const postProfessorRequest = (data: TProfessorCreate) =>
  http.post('/professors', data)

export const getProfessorsRequest = (params: TParams) =>
  http.get('/professors', { params })

export const patchProfessorRequest = ({
  id,
  data,
}: {
  id: string
  data: Partial<TProfessor>
}) => http.patch(`/professors/${id}`, data)
