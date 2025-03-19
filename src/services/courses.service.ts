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

// export const getCoursesRequest = async (params: TParams) => {
//   console.log('Request params before sending to API', params);
//   http.get('/courses', { params });
// };
export const getCoursesRequest = async (params: TParams) => {
  console.log('Request params before sending to API:', params);
  console.log('Final API request params:', params, typeof params.limit, typeof params.page);

  return http.get('/courses', {
    params: {
      limit: Number(params.limit),
      page: Number(params.page),
      search: params.search || '',
    },
  });
};

// // export const getCoursesRequest = (params: TParams) =>
// //   http.get('/professors', { params });

// export const getCoursesRequest = async (params: { limit: number; page: number; search?: string }) =>
//   http.get('/courses', { params });


export const getCourseRequest = async (id: string) => http.get(`/courses/${id}`);

export const getInfoCourse = async (id: string) => http.get(`/courses/info/${id}`);

export const getGroupsCourse = async (id: string) => http.get(`/assignment/${id}`);

export const assignmentCreate = async(data: CreateAssignment) => http.patch('/assignment', data );
