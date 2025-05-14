import { http } from '.';
import { CreateAssignment } from '@/features/courses/components/AddNewRecourd';
import { TParams } from '@/store/courses/courses.slice';
import { TCreateCourse } from '@/types/courses';

export const postCourseRequest = async (data: TCreateCourse) =>
  http.post('/courses', data);

export const patchCourseRequest = async (id: string, data: TCreateCourse) =>
  http.patch(`/courses/${id}`, data);

export const deleteCourseRequest = async (id: string) =>
  http.delete(`/courses/${id}`);

export const getCoursesRequest = async (params: TParams) =>
  http.get('/courses', { params });

export const getCourseRequest = async (id: string) => http.get(`/courses/${id}`);

export const getInfoCourse = async (id: string) => http.get(`/courses/info/${id}`);

export const getGroupsCourse = async (id: string) => http.get(`/assignment/${id}`);

export const assignmentCreate = async(data: CreateAssignment) => http.post('/assignment', data );