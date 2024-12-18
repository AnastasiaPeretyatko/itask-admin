import { createSlice } from '@reduxjs/toolkit'
import { TCourse } from '@/types/course'
import {
  deleteCourseThunk,
  getCoursesThunk,
  patchCourseThunk,
  postCourseThunk,
} from './courses.thunks'

type TInitialState = {
  data: TCourse[] | []
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

const courses = createSlice({
  name: 'courses',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(postCourseThunk.pending, state => {
        state.isLoading = true
        state.message = null
      })
      .addCase(postCourseThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.data = [payload.data, ...state.data]
      })
      .addCase(postCourseThunk.rejected, state => {
        state.isLoading = false
      })
      .addCase(getCoursesThunk.pending, state => {
        state.isLoading = true
        state.message = null
      })
      .addCase(getCoursesThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.data = payload.data
        state.count = payload.count
      })
      .addCase(getCoursesThunk.rejected, state => {
        state.isLoading = false
      })
      .addCase(patchCourseThunk.pending, state => {
        state.isLoading = true
        state.message = null
      })
      .addCase(patchCourseThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.data = state.data.map(item =>
          item.id === payload.data.id ? payload.data : item
        )
        state.message = payload.message
      })
      .addCase(patchCourseThunk.rejected, state => {
        state.isLoading = false
      })
      .addCase(deleteCourseThunk.pending, state => {
        state.isLoading = true
        state.message = null
      })
      .addCase(deleteCourseThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.data = state.data.filter(item => item.id !== payload.id)
        state.message = payload.message
      })
      .addCase(deleteCourseThunk.rejected, state => {
        state.isLoading = false
      })
  },
})

export default courses.reducer
