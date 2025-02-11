import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  addTeacherToCourseRequest,
  getTeachersByCourseRequest,
} from '@/services/professor-course.service';
import { MessageType } from '@/types/common';
import {
  TCreateTeacherToCourse,
  TTeacherToCourse,
} from '@/types/professor-course';

export const addTeacherToCourseThunk = createAsyncThunk<
  { data: TTeacherToCourse; message: MessageType },
  TCreateTeacherToCourse,
  {
    rejectValue: { statusCode: number; message: MessageType }
    fulfillWithValue: { data: TTeacherToCourse; message: MessageType }
  }
>('/add-teacher', async (data, { rejectWithValue, fulfillWithValue }) => {
  try {
    const res = await addTeacherToCourseRequest(data);

    return fulfillWithValue({
      data: res.data.data,
      message: res.data.message,
    });
  } catch (error) {
    const hasErrResponse = (
      error as {
        response: { data: { statusCode: number; message: MessageType } }
      }
    ).response;
    if (!hasErrResponse) {
      throw error;
    }
    return rejectWithValue(hasErrResponse.data);
  }
});

export const getAllProfessorByCourseThunk = createAsyncThunk<
  { data: TTeacherToCourse[]},
  string,
  {
    rejectValue: { statusCode: number; message: MessageType }
  }
>('/find-teacher', async (id, { rejectWithValue }) => {
  try {
    const res = await getTeachersByCourseRequest(id);
    return {
      data: res.data,
    };
  } catch (error) {
    const hasErrResponse = (
      error as {
        response: { data: { statusCode: number; message: MessageType } }
      }
    ).response;
    if (!hasErrResponse) {
      throw error;
    }
    return rejectWithValue(hasErrResponse.data);
  }
});