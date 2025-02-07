import { TGroup } from '@/types/groups'
import { createSlice } from '@reduxjs/toolkit'
import {
  getGroupsThunk,
  patchGroupThunk,
  postGroupThunk
} from './groups.thunks'

export type TParams = {
  limit: number
  page: number
  search?: string
}

type TInitialState = {
  data: TGroup[] | []
  currentGroup: TGroup
  count: number
  isLoading: boolean
  message: string | null
}

const initialState: TInitialState = {
  data: [],
  currentGroup: {} as TGroup,
  count: 0,
  isLoading: true,
  message: null,
}

const groups = createSlice({
  name: 'groups',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(postGroupThunk.pending, state => {
        state.isLoading = true
        state.message = null
      })
      .addCase(postGroupThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.data = [payload.data, ...state.data]
      })
      .addCase(postGroupThunk.rejected, state => {
        state.isLoading = false
      })
      .addCase(getGroupsThunk.pending, state => {
        state.isLoading = true
        state.message = null
      })
      .addCase(getGroupsThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.data = payload.data
        state.count = payload.count
      })
      .addCase(getGroupsThunk.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(patchGroupThunk.pending, state => {
        state.isLoading = true
        state.message = null
      })
      .addCase(patchGroupThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.data = state.data.map(el =>
          el.id === payload.data.id ? payload.data : el
        )
      })
  },
})

export default groups.reducer