import { createSlice } from '@reduxjs/toolkit';
import { PaginationState } from '../professors/professors.slice';
import {
  deleteCourseThunk,
  getCoursesThunk,
  patchCourseThunk,
  postCourseThunk,
} from './courses.thunks';
import { MessageType } from '@/types/common';
import { TCourse } from '@/types/courses';

type TInitialState = {
  courses: TCourse[] | []
  pagination: PaginationState
  count: number
  isLoading: boolean
  message: MessageType | null
}

const initialState: TInitialState = {
  courses: [],
  pagination: {
    page: 1,
    limit: 10,
    search: '',
  },
  count: 0,
  isLoading: true,
  message: null,
};

const courses = createSlice({
  name: 'courses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postCourseThunk.pending, (state) => {
        state.isLoading = true;
        state.message = null;
      })
      .addCase(postCourseThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.courses = [payload.data, ...state.courses];
      })
      .addCase(postCourseThunk.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getCoursesThunk.pending, (state) => {
        state.isLoading = true;
        state.message = null;
      })
      .addCase(getCoursesThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.courses = payload.data;
        state.count = payload.count;
      })
      .addCase(getCoursesThunk.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(patchCourseThunk.pending, (state) => {
        state.isLoading = true;
        state.message = null;
      })
      .addCase(patchCourseThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.courses = state.courses.map((item) =>
          item.id === payload.data.id ? payload.data : item,
        );
        state.message = payload.message;
      })
      .addCase(patchCourseThunk.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteCourseThunk.pending, (state) => {
        state.isLoading = true;
        state.message = null;
      })
      .addCase(deleteCourseThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.courses = state.courses.filter((item) => item.id !== payload.id);
        state.message = payload.message;
      })
      .addCase(deleteCourseThunk.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default courses.reducer;