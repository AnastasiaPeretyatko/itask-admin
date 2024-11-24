import { TStudentCreate } from '@/types/student'
import { http } from '.'
import { TParams } from '@/store/students/student.slice'

export const postStudentRequest = (data: TStudentCreate) =>
  http.post('/students', data)

export const patchStudentRequest = ({
  id,
  data,
}: {
  id: string
  data: TStudentCreate
}) => http.patch(`/students/${id}`, data)

export const getAllStudentsRequest = (params: TParams) =>
  http.get('/students', { params })
