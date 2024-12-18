import { TCreateTeacherToCourse } from '@/types/professor-course'
import { http } from '.'

export const addTeacherToCourseRequest = (data: TCreateTeacherToCourse) =>
  http.post('/professor-course', data)

export const getTeachersByCourseRequest = (courseId: string) =>
  http.get(`/professor-course/${courseId}`)
