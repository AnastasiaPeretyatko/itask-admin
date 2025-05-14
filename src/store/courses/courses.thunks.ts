import { createAsyncThunk } from '@reduxjs/toolkit';
import { TParams } from './courses.slice';
import { CreateAssignment } from '@/features/courses/components/AddNewRecourd';
import {
  assignmentCreate,
  deleteCourseRequest,
  getCourseRequest,
  getCoursesRequest,
  getGroupsCourse,
  getInfoCourse,
  patchCourseRequest,
  postCourseRequest,
} from '@/services/courses.service';
import { MessageType } from '@/types/common';
import { Assignment, TCourse, TCreateCourse } from '@/types/courses';
import { cleanObject } from '@/utils/cleanObject';
import { handleThunkError } from '@/utils/handleThunkError';

export const postCourseThunk = createAsyncThunk<
  { data: TCourse; message: string },
  TCreateCourse,
  {
    rejectValue: { statusCode: number; message: string }
    fulfillWithValue: { data: TCourse; message: string }
  }
>('/course.create', async (body, { rejectWithValue, fulfillWithValue }) => {
  try {
    const { data } = await postCourseRequest(body);
    return fulfillWithValue(data);
  } catch (error) {
    return handleThunkError(error, rejectWithValue);
  }
});

export const patchCourseThunk = createAsyncThunk<
  { data: TCourse; message: MessageType },
  { id: string; data: TCreateCourse },
  {
    rejectValue: { statusCode: number; message: MessageType }
    fulfillWithValue: { data: TCourse; message: MessageType }
  }
>(
  '/course.update',
  async ({ id, data }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const res = await patchCourseRequest(id, data);
      return fulfillWithValue({
        data: res.data.data,
        message: res.data.message,
      });
    } catch (error) {
      return handleThunkError(error, rejectWithValue);
    }
  },
);

export const deleteCourseThunk = createAsyncThunk<
  { id: string; message: MessageType },
  string,
  {
    rejectValue: { statusCode: number; message: MessageType }
    fulfillWithValue: { id: string; message: MessageType }
  }
>('/course.delete', async (id, { rejectWithValue, fulfillWithValue }) => {
  try {
    const res = await deleteCourseRequest(id);
    return fulfillWithValue({
      id,
      message: res.data.message,
    });
  } catch (error) {
    return handleThunkError(error, rejectWithValue);
  }
});

export const getCoursesThunk = createAsyncThunk<
  { data: TCourse[]; count: number },
  TParams,
  {
    rejectValue: { statusCode: number; message: MessageType }
  }
>('/courses.info', async (params, { rejectWithValue }) => {
  try {
    const paramsWithoutEmpty = cleanObject(params) as TParams;
    const { data } = await getCoursesRequest(paramsWithoutEmpty);
    return { ...data };
  } catch (error) {
    const hasErrResponse = (
      error as { response: { data: { statusCode: number; message: MessageType } } }
    ).response;
    if (!hasErrResponse) {
      throw error;
    }
    return rejectWithValue(hasErrResponse.data);
  }
});

export const getCourseThunk = createAsyncThunk<
  { data: TCourse },
  string,
  {
    rejectValue: { statusCode: number; message: MessageType }
  }
>('/course.info', async (id, { rejectWithValue }) => {
  try {
    const res = await getCourseRequest(id);
    return { data: res.data.rows };
  } catch (error) {
    return handleThunkError(error, rejectWithValue);
  }
});



export const info = createAsyncThunk<
  { data: TCourse },
  string,
  {
    rejectValue: { statusCode: number; message: string }
  }
>('/course.getInfo', async (id, { rejectWithValue }) => {
  try {
    const res = await getInfoCourse(id);
    return { data: res.data };
  } catch (error) {
    return handleThunkError(error, rejectWithValue);
  }
});

export const groups = createAsyncThunk<
  { data: Assignment[] },
  string,
  {
    rejectValue: { statusCode: number; message: string }
  }
>('/course.groups', async (id, { rejectWithValue }) => {
  try {
    const res = await getGroupsCourse(id);
    return { data: res.data };
  } catch (error) {
    return handleThunkError(error, rejectWithValue);
  }
});

const create = createAsyncThunk<
  {data: Assignment, message: string},
  CreateAssignment,
  { rejectValue: { statusCode: number; message: string } }
  >('/assignment/create', async (dto, { rejectWithValue }) => {
    try {
      const { data } = await assignmentCreate(dto);
      return data;
    } catch (error) {
      return handleThunkError(error, rejectWithValue);
    }
  });

export const course = { info, groups };

export const assignment = { create };