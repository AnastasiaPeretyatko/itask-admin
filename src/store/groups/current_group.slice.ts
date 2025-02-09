import { TGroup } from '@/types/groups'
import { TStudent } from '@/types/student'
import { createSlice } from '@reduxjs/toolkit'
import { getGroupOneThunk } from './groups.thunks'
import { patchStudentThunk, postStudentThunk } from '../students/students.thunks'

type TInitialState = {
  data: TGroup
  students: TStudent[]
  isLoading: boolean
  message: string | null
}

const initialState: TInitialState = {
  data: {} as TGroup,
  students: [],
  isLoading: true,
  message: null,
}

const currentGroup = createSlice({
  name: 'current_group',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getGroupOneThunk.pending, state => {
        state.isLoading = true
        state.message = null
      })
      .addCase(getGroupOneThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.data = payload.data
      })
      .addCase(getGroupOneThunk.rejected, state => {
        state.isLoading = false
      })
      // .addCase(postStudentThunk.pending, state => {
      //   state.isLoading = true
      //   state.message = null
      // })
      .addCase(postStudentThunk.fulfilled, (state, { payload }) => {
        const {data} = payload
        if(data.group.id !== state.data.id) return
        state.isLoading = false
        state.students = [data, ...state.students]
      })
      .addCase(patchStudentThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.students = state.students.map(student =>
          student.id === payload.data.id ? payload.data : student
        )
      })
      // .addCase(postStudentThunk.rejected, state => {
      //   state.isLoading = false
      // })
  },
})

export default currentGroup.reducer
