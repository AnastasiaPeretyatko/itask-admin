import { createAsyncThunk } from '@reduxjs/toolkit'
import { TStudent, TStudentCreate } from '@/types/student'
import {
  getAllStudentsRequest,
  postStudentRequest,
} from '@/services/students.service'
import { TParams } from './student.slice'
import { MessageType } from '@/types/common'

export const postStudentThunk = createAsyncThunk<
  { data: TStudent; message: MessageType },
  TStudentCreate,
  {
    rejectValue: { statusCode: number; message: MessageType }
    fulfillWithValue: { data: TStudent; message: MessageType }
  }
>('/student/create', async (data, { rejectWithValue, fulfillWithValue }) => {
  try {
    const res = await postStudentRequest(data)

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

export const getAllStudentsThunk = createAsyncThunk<
  { data: TStudent[], count: number  },
  TParams,
  {
    rejectValue: { statusCode: number; message: MessageType }
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
      error as { response: { data: { statusCode: number; message: MessageType } } }
    ).response
    if (!hasErrResponse) {
      throw error
    }
    return rejectWithValue(hasErrResponse.data)
  }
})
