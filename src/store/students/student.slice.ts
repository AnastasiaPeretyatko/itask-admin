import { TStudent } from '@/types/student'
import { createSlice } from '@reduxjs/toolkit'
import {
  getAllStudentsThunk,
  getStudentsByGroupThunk,
  patchStudentThunk,
  postStudentThunk,
} from './students.thunks'
import { PaginationState } from '../professors/professors.slice'

export type TParams = {
  limit: number
  page: number
  search?: string
}

type TInitialState = {
  students: TStudent[]
  pagination: PaginationState
  count: number
  isLoading: boolean
  message: string | null
}

const initialState: TInitialState = {
  students: [],
  pagination: {
    page: 1,
    limit: 10,
    search: '',
  },
  count: 0,
  isLoading: true,
  message: null,
}

const students = createSlice({
  name: 'students',
  initialState,
  reducers: {
    setLimit: (state, { payload }) => {
      state.pagination.limit = payload;
    },
    setPage: (state, { payload }) => {
      state.pagination.page = payload;
    },
    setSearch: (state, { payload }) => {
      state.pagination.search = payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(postStudentThunk.pending, state => {
        state.isLoading = true
        state.message = null
      })
      .addCase(postStudentThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.count++
        state.students = [payload.data, ...state.students]
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
        state.students = payload.data
        state.count = payload.count
      })
      .addCase(getAllStudentsThunk.rejected, state => {
        state.isLoading = false
      })
      .addCase(patchStudentThunk.pending, state => {
        state.isLoading = true
        state.message = null
      })
      .addCase(patchStudentThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.students = state.students.map(student =>
          student.id === payload.data.id ? payload.data : student
        )
      })
      .addCase(patchStudentThunk.rejected, state => {
        state.isLoading = false
      })
      .addCase(getStudentsByGroupThunk.pending, state => {
        state.isLoading = true
        state.message = null
      })
      .addCase(getStudentsByGroupThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.students = payload.data
      })
      .addCase(getStudentsByGroupThunk.rejected, state => {
        state.isLoading = false
      })
  },
})

export const { setLimit, setPage, setSearch } = students.actions

export default students.reducer
