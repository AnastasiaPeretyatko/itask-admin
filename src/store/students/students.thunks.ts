import { createAsyncThunk } from '@reduxjs/toolkit'
import { TStudent, TStudentCreate } from '@/types/student'
import {
  getAllStudentsRequest,
  postStudentRequest,
} from '@/services/students.service'
import { TParams } from './student.slice'

export const postStudentThunk = createAsyncThunk<
  { data: TStudent; message: string },
  TStudentCreate,
  {
    rejectValue: { statusCode: number; message: string }
    fulfillWithValue: { data: TStudent; message: string }
  }
>('/student/create', async (data, { rejectWithValue, fulfillWithValue }) => {
  try {
    const res = await postStudentRequest(data)
    console.log(res)

    return fulfillWithValue({
      data: res.data.data,
      message: res.data.message,
    })
  } catch (error) {
    const hasErrResponse = (
      error as { response: { data: { statusCode: number; message: string } } }
    ).response
    if (!hasErrResponse) {
      throw error
    }
    return rejectWithValue(hasErrResponse.data)
  }
})

export const getAllStudentsThunk = createAsyncThunk<
  { data: TStudent[], count: number  },
  TParams,
  {
    rejectValue: { statusCode: number; message: string }
  }
>('/students/getAll', async (params, { rejectWithValue }) => {
  try {
    const res = await getAllStudentsRequest(params)

    return {
      data: res.data.data,
      count: res.data.count,
    }
  } catch (error) {
    const hasErrResponse = (
      error as { response: { data: { statusCode: number; message: string } } }
    ).response
    if (!hasErrResponse) {
      throw error
    }
    return rejectWithValue(hasErrResponse.data)
  }
})
