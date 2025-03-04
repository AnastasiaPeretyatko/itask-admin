import { http } from '.';
import { TCreateTeacherToCourse } from '@/types/professor-course';

export const addTeacherToCourseRequest = (data: TCreateTeacherToCourse) =>
  http.post('/professor-course', data);

export const getTeachersByCourseRequest = (courseId: string) =>
  http.get(`/professor-course/${courseId}`);