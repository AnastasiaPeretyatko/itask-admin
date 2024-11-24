import {
  getGroupNameAndIdRequest,
  getGroupRequest,
  getStudentsByGroupRequest,
} from '@/services/groups.service'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { TGroup, TGroupCreate, TName } from '@/types/groups'
import { MessageType } from '@/types/common'
import {
  getGroupsRequest,
  patchGroupRequest,
  postGroupRequest,
} from '@/services/groups.service'
import { TParams } from './groups.slice'
import { TStudent } from '@/types/student'

export const getGroupNameAndIdThunk = createAsyncThunk<
  { data: TName[] },
  string,
  {
    rejectValue: { statusCode: number; message: MessageType }
  }
>('/groups/groups.name', async (search, { rejectWithValue }) => {
  try {
    const res = await getGroupNameAndIdRequest(search)
    return {
      data: res.data,
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

export const postGroupThunk = createAsyncThunk<
  { data: TGroup; message: MessageType },
  TGroupCreate,
  {
    rejectValue: { statusCode: number; message: MessageType }
    fulfillWithValue: { data: TGroup; message: MessageType }
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
      error as { response: { data: { statusCode: number; message: MessageType } } }
    ).response
    if (!hasErrResponse) {
      throw error
    }
    return rejectWithValue(hasErrResponse.data)
  }
})

export const getGroupsThunk = createAsyncThunk<
  { data: TGroup[]; count: number },
  TParams,
  {
    rejectValue: { statusCode: number; message: MessageType }
  }
>('/group/get', async (params, { rejectWithValue }) => {
  try {
    const res = await getGroupsRequest(params)
    return {
      data: res.data.data,
      count: res.data.count,
    }
  } catch (error) {
    const hasErrResponse = (
      error as {
        response: { data: { statusCode: number; message: MessageType } }
      }
    ).response
    if (!hasErrResponse) {
      throw error
    }
    return rejectWithValue(hasErrResponse.data)
  }
})

export const getGroupOneThunk = createAsyncThunk<
  { data: TGroup },
  string,
  {
    rejectValue: { statusCode: number; message: MessageType }
  }
>('/group/one', async (id, { rejectWithValue }) => {
  try {
    const res = await getGroupRequest(id)
    return res
  } catch (error) {
    const hasErrResponse = (
      error as {
        response: { data: { statusCode: number; message: MessageType } }
      }
    ).response
    if (!hasErrResponse) {
      throw error
    }
    return rejectWithValue(hasErrResponse.data)
  }
})

export const patchGroupThunk = createAsyncThunk<
  { data: TGroup; message: MessageType },
  { id: string; data: Partial<TGroup> },
  {
    rejectValue: { statusCode: number; message: MessageType }
    fulfillWithValue: { data: TGroup; message: MessageType }
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
      error as { response: { data: { statusCode: number; message: MessageType } } }
    ).response
    if (!hasErrResponse) {
      throw error
    }
    return rejectWithValue(hasErrResponse.data)
  }
})

export const getStudentsByGroupThunk = createAsyncThunk<
  { data: TStudent[] },
  string,
  {
    rejectValue: { statusCode: number; message: MessageType }
  }
>('/groups/students', async (id, { rejectWithValue }) => {
  try {
    const res = await getStudentsByGroupRequest(id)

    return res
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