import { TProfessor } from '@/types/professor'
import { createSlice } from '@reduxjs/toolkit'
import {
  getProfessorsThunk,
  patchProfessorThunk,
  postProfessorThunk,
} from './professors.thunks'

export type TParams = {
  limit: number
  page: number
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
        state.data = [payload.data, ...state.data]
      })
      .addCase(postProfessorThunk.rejected, state => {
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
      .addCase(patchProfessorThunk.pending, state => {
        state.isLoading = true
        state.message = null
      })
      .addCase(patchProfessorThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false
        console.log(payload.data);
        state.data = state.data.map(el =>
          el.id === payload.data.id ? payload.data : el
        )
      })
  },
})

export default professors.reducer