import {
  getProfessorsRequest,
  postProfessorRequest,
} from '@/services/professor.service'
import { TProfessor, TProfessorCreate } from '@/types/professor'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export type TParams = {
  limit: number,
  page: number,
  search?: string
}

type TInitialState = {
  data: TProfessor[] | []
  count: number
  isLoading: boolean
  message: string | null
}

const initialState: TInitialState = {
  data: [],
  count: 0,
  isLoading: true,
  message: null,
}

export const postProfessorThunk = createAsyncThunk<
  { data: TProfessor; message: string },
  TProfessorCreate,
  { rejectValue: { statusCode: number; message: string },
    fulfillWithValue: { data: TProfessor; message: string },
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

const professors = createSlice({
  name: 'professors',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(postProfessorThunk.pending, state => {
        state.isLoading = true
        state.message = null
      })
      .addCase(postProfessorThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.data.unshift(payload.data)
      })
      .addCase(postProfessorThunk.rejected, (state, { payload }) => {
        state.isLoading = false
      })
      .addCase(getProfessorsThunk.pending, state => {
        state.isLoading = true
        state.message = null
      })
      .addCase(getProfessorsThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.data = payload.data
        state.count = payload.count
      })
      .addCase(getProfessorsThunk.rejected, (state, { payload }) => {
        state.isLoading = false
        console.log('payload', payload)
      })
  },
})

export default professors.reducer