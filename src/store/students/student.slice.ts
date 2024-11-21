import { TStudent } from '@/types/student'
import { createSlice } from '@reduxjs/toolkit'
import {
  getAllStudentsThunk,
  postStudentThunk,
} from './students.thunks'

export type TParams = {
  limit: number
  page: number
  search?: string
}

type TInitialState = {
  data: TStudent[] | []
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

const students = createSlice({
  name: 'students',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(postStudentThunk.pending, state => {
        state.isLoading = true
        state.message = null
      })
      .addCase(postStudentThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.data = [payload.data, ...state.data]
      })
      .addCase(postStudentThunk.rejected, state => {
        state.isLoading = false
      })
      .addCase(getAllStudentsThunk.pending, state => {
        state.isLoading = true
        state.message = null
      })
      .addCase(getAllStudentsThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false
        console.log('payload', payload);
        state.data = payload.data
      })
      .addCase(getAllStudentsThunk.rejected, state => {
        state.isLoading = false
      })
  },
})

export default students.reducer
