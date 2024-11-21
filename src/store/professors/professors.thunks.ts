import { TProfessor, TProfessorCreate } from '@/types/professor'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { TParams } from './professors.slice'
import {
  getProfessorsRequest,
  patchProfessorRequest,
  postProfessorRequest,
} from '@/services/professor.service'

export const postProfessorThunk = createAsyncThunk<
  { data: TProfessor; message: string },
  TProfessorCreate,
  {
    rejectValue: { statusCode: number; message: string }
    fulfillWithValue: { data: TProfessor; message: string }
  }
>('/professor/create', async (data, { rejectWithValue, fulfillWithValue }) => {
  try {
    const res = await postProfessorRequest(data)

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

export const getProfessorsThunk = createAsyncThunk<
  { data: TProfessor[]; count: number },
  TParams,
  {
    rejectValue: { statusCode: number; message: string }
  }
>('/professor/get', async (params, { rejectWithValue }) => {
  try {
    const res = await getProfessorsRequest(params)
    return {
      data: res.data.rows,
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

export const patchProfessorThunk = createAsyncThunk<
  { data: TProfessor; message: string },
  { id: string; data: Partial<TProfessor> },
  {
    rejectValue: { statusCode: number; message: string }
    fulfillWithValue: { data: TProfessor; message: string }
  }
>('/professor/patch', async ({ id, data }, { rejectWithValue }) => {
  try {
    const res = await patchProfessorRequest({ id, data })
    return {
      data: res.data,
      message: res.data.message,
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
