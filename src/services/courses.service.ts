import { TCreateCourse } from '@/types/course'
import { http } from '.'

export const postCourseRequest = async (data: TCreateCourse) =>
  http.post('/courses', data)

export const patchCourseRequest = async (id: string, data: TCreateCourse) =>
  http.patch(`/courses/${id}`, data)

export const deleteCourseRequest = async (id: string) =>
  http.delete(`/courses/${id}`)

export const getCoursesRequest = async () =>
  http.get('/courses')

export const getCourseRequest = async (id: string) => http.get(`/courses/${id}`)
