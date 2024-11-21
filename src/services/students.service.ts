import { TStudentCreate } from '@/types/student'
import { http } from '.'

export const postStudentRequest = (data: TStudentCreate) =>
  http.post('/students', data)

export const getAllStudentsRequest = () => http.get('/students')
