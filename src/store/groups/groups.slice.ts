import { TGroup } from '@/types/groups'
import { createSlice } from '@reduxjs/toolkit'
import {
  getGroupsThunk,
  patchGroupThunk,
  postGroupThunk
} from './groups.thunks'
import { PaginationState } from '../professors/professors.slice'

export type TParams = {
  limit: number
  page: number
  search?: string
}

type TInitialState = {
  groups: TGroup[]
  pagination: PaginationState
  currentGroup: TGroup
  count: number
  isLoading: boolean
  message: string | null
}

const initialState: TInitialState = {
  groups: [],
  pagination: {
    page: 1,
    limit: 10,
    search: '',
  },
  currentGroup: {} as TGroup,
  count: 0,
  isLoading: true,
  message: null,
}

const groups = createSlice({
  name: 'groups',
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
      .addCase(postGroupThunk.pending, state => {
        state.isLoading = true
        state.message = null
      })
      .addCase(postGroupThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.count++;

        state.groups = [payload.data, ...state.groups]
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
        state.groups = payload.data
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
        state.groups = state.groups.map(el =>
          el.id === payload.data.id ? payload.data : el
        )
      })
  },
})

export const { setLimit, setPage, setSearch } = groups.actions

export default groups.reducer