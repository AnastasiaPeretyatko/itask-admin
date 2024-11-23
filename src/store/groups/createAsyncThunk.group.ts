import { TGroup, TGroupCreate } from '@/types/group'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { TParams } from './groups.slice'
import {
  getGroupRequest,
  patchGroupRequest,
  postGroupRequest,
} from '@/services/group.service'

export const postGroupThunk = createAsyncThunk<
  { data: TGroup; message: string },
  TGroupCreate,
  {
    rejectValue: { statusCode: number; message: string }
    fulfillWithValue: { data: TGroup; message: string }
  }
>('/group/create', async (data, { rejectWithValue, fulfillWithValue }) => {
  try {
    const res = await postGroupRequest(data)

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

export const getGroupThunk = createAsyncThunk<
  { data: TGroup[]; count: number },
  TParams,
  {
    rejectValue: { statusCode: number; message: string }
  }
>('/group/get', async (params, { rejectWithValue }) => {
  try {
    const res = await getGroupRequest(params)
    console.log(res)
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

export const patchGroupThunk = createAsyncThunk<
  { data: TGroup; message: string },
  { id: string; data: Partial<TGroup> },
  {
    rejectValue: { statusCode: number; message: string }
    fulfillWithValue: { data: TGroup; message: string }
  }
>('/group/patch', async ({ id, data }, { rejectWithValue }) => {
  try {
    const res = await patchGroupRequest({ id, data })
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