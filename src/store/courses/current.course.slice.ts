import { createSlice } from '@reduxjs/toolkit';
import { course, info } from './courses.thunks';
import { CourseAssignmentType, TCourse } from '@/types/courses';

type TInitialState = {
  current: TCourse | null
  data: CourseAssignmentType[] | null
}

const initialState: TInitialState = {
  current: null,
  data: null,
};

const courses = createSlice({
  name: 'course',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(course.info.pending, (state) => {
        state.current = null;
      })
      .addCase(info.fulfilled, (state, { payload }) => {
        state.current = payload.data;
      })
      .addCase(info.rejected, (state) => {
        state.current = null;
      })
      .addCase(course.groups.pending, (state) => {
        state.data = null;
      })
      .addCase(course.groups.fulfilled, (state, { payload }) => {
        state.data = payload.data;
      })
      .addCase(course.groups.rejected, (state) => {
        state.data = null;
      });
  },
});

export default courses.reducer;