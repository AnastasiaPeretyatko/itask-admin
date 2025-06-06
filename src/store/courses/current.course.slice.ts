import { createSlice } from '@reduxjs/toolkit';
import { assignment, course, info } from './courses.thunks';
import { Assignment, TCourse } from '@/types/courses';

type TInitialState = {
  current: TCourse | null
  groups: Assignment[] | null
  isLoading: boolean
}

const initialState: TInitialState = {
  current: null,
  groups: null,
  isLoading: true,
};

const courses = createSlice({
  name: 'course',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(course.info.pending, (state) => {
        state.current = null;
        state.isLoading = true;
      })
      .addCase(info.fulfilled, (state, { payload }) => {
        state.current = payload.data;
        state.isLoading = false;
      })
      .addCase(info.rejected, (state) => {
        state.current = null;
        state.isLoading = false;
      })
      .addCase(course.groups.pending, (state) => {
        state.groups = null;
        state.isLoading = true;
      })
      .addCase(course.groups.fulfilled, (state, { payload }) => {
        state.groups = payload.data;
        state.isLoading = false;
      })
      .addCase(course.groups.rejected, (state) => {
        state.groups = null;
        state.isLoading = false;
      })
      .addCase(assignment.create.fulfilled, (state, { payload }) => {
        const { data } = payload;
        state.groups = state.groups ? [...state.groups, data] : [data];
      });
  },
});

export default courses.reducer;