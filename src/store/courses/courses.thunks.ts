import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  deleteCourseRequest,
  getCourseRequest,
  getCoursesRequest,
  patchCourseRequest,
  postCourseRequest,
} from '@/services/courses.service';
import { MessageType } from '@/types/common';
import { TCourse, TCreateCourse } from '@/types/courses';
import { handleThunkError } from '@/utils/handleThunkError';

export const postCourseThunk = createAsyncThunk<
  { data: TCourse; message: MessageType },
  TCreateCourse,
  {
    rejectValue: { statusCode: number; message: MessageType }
    fulfillWithValue: { data: TCourse; message: MessageType }
  }
>('/course.create', async (data, { rejectWithValue, fulfillWithValue }) => {
  try {
    const res = await postCourseRequest(data);

    return fulfillWithValue({
      data: res.data.data,
      message: res.data.message,
    });
  } catch (error) {
    return handleThunkError(error, rejectWithValue);
  }
});

export const patchCourseThunk = createAsyncThunk<
  { data: TCourse; message: MessageType },
  { id: string; data: TCreateCourse },
  {
    rejectValue: { statusCode: number; message: MessageType }
    fullfillWithValue: { data: TCourse; message: MessageType }
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
  undefined,
  {
    rejectValue: { statusCode: number; message: MessageType }
  }
>('/courses.info', async (_, { rejectWithValue }) => {
  try {
    const res = await getCoursesRequest();
    return {
      data: res.data.data,
      count: res.data.count,
    };
  } catch (error) {
    return handleThunkError(error, rejectWithValue);
  }
});

export const getCourseThunk = createAsyncThunk<
  { data: TCourse},
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