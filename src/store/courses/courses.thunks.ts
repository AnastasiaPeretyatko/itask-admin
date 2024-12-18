import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  deleteCourseRequest,
  getCoursesRequest,
  patchCourseRequest,
  postCourseRequest,
} from '@/services/courses.service'
import { TCourse, TCreateCourse } from '@/types/course';
import { MessageType } from '@/types/common';

export const postCourseThunk = createAsyncThunk<
  { data: TCourse; message: MessageType },
  TCreateCourse,
  {
    rejectValue: { statusCode: number; message: MessageType }
    fulfillWithValue: { data: TCourse; message: MessageType }
  }
>('/course.create', async (data, { rejectWithValue, fulfillWithValue }) => {
  try {
    const res = await postCourseRequest(data)

    return fulfillWithValue({
      data: res.data.data,
      message: res.data.message,
    })
  } catch (error) {
    const hasErrResponse = (
      error as { response: { data: { statusCode: number; message: MessageType } } }
    ).response
    if (!hasErrResponse) {
      throw error
    }
    return rejectWithValue(hasErrResponse.data)
  }
})

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
      const res = await patchCourseRequest(id, data)
      return fulfillWithValue({
        data: res.data.rows,
        message: res.data.message,
      })
    } catch (error) {
      const hasErrResponse = (
        error as { response: { data: { statusCode: number; message: MessageType } } }
      ).response
      if (!hasErrResponse) {
        throw error
      }
      return rejectWithValue(hasErrResponse.data)
    }
  }
)

export const deleteCourseThunk = createAsyncThunk<
  { id: string; message: MessageType },
  string,
  {
    rejectValue: { statusCode: number; message: MessageType }
    fulfillWithValue: { id: string; message: MessageType }
  }
>('/course.delete', async (id, { rejectWithValue, fulfillWithValue }) => {
  try {
    const res = await deleteCourseRequest(id)
    return fulfillWithValue({
      id,
      message: res.data.message,
    })
  } catch (error) {
    const hasErrResponse = (
      error as { response: { data: { statusCode: number; message: MessageType } } }
    ).response
    if (!hasErrResponse) {
      throw error
    }
    return rejectWithValue(hasErrResponse.data)
  }
})

export const getCoursesThunk = createAsyncThunk<
  { data: TCourse[]; count: number },
  undefined,
  {
    rejectValue: { statusCode: number; message: MessageType }
  }
>('/courses.info', async (_, { rejectWithValue }) => {
  try {
    const res = await getCoursesRequest()
    return {
      data: res.data.data,
      count: res.data.count,
    }
  } catch (error) {
    const hasErrResponse = (
      error as { response: { data: { statusCode: number; message: MessageType } } }
    ).response
    if (!hasErrResponse) {
      throw error
    }
    return rejectWithValue(hasErrResponse.data)
  }
})

export const getCourseThunk = createAsyncThunk<
  { data: TCourse},
  string,
  {
    rejectValue: { statusCode: number; message: MessageType }
  }
>('/course.info', async (id, { rejectWithValue }) => {
  try {
    const res = await getCoursesRequest()
    return { data: res.data.rows }
  } catch (error) {
    const hasErrResponse = (
      error as { response: { data: { statusCode: number; message: MessageType } } }
    ).response
    if (!hasErrResponse) {
      throw error
    }
    return rejectWithValue(hasErrResponse.data)
  }
})
