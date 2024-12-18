import { createSlice } from '@reduxjs/toolkit'
import { TTeacherToCourse } from '@/types/professor-course'
import {
  addTeacherToCourseThunk,
  getAllProfessorByCourseThunk,
} from './professor-course.thunks'

type TInitialState = {
  data: TTeacherToCourse[] | []
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

const professorCourse = createSlice({
  name: 'professor-course',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(addTeacherToCourseThunk.pending, state => {
        state.isLoading = true
        state.message = null
      })
      .addCase(addTeacherToCourseThunk.fulfilled, (state, { payload }) => {
        state.data = [payload.data, ...state.data]
        state.isLoading = false
      })
      .addCase(addTeacherToCourseThunk.rejected, state => {
        state.isLoading = false
      })
      .addCase(getAllProfessorByCourseThunk.pending, state => {
        state.isLoading = true
        state.message = null
      })
      .addCase(getAllProfessorByCourseThunk.fulfilled, (state, { payload }) => {
        state.data = payload.data
        state.isLoading = false
      })
      .addCase(getAllProfessorByCourseThunk.rejected, state => {
        state.isLoading = false
      })
  },
})

export default professorCourse.reducer
