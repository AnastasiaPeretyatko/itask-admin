import { TProfessorCreate } from '@/types/professor'
import { http } from '.'
import { TParams } from '@/store/professors/professors.slice'

export const postProfessorRequest = (data: TProfessorCreate) =>
  http.post('/professors', data)

export const getProfessorsRequest = (params: TParams) => http.get('/professors', {params})