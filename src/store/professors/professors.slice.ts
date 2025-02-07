import { createSlice } from '@reduxjs/toolkit';
import {
  getProfessorsThunk,
  patchProfessorThunk,
  postProfessorThunk,
} from './professors.thunks';
import { TProfessor } from '@/types/professor';

export type TParams = {
  limit: number
  page: number
  search?: string
}

interface PaginationState {
  page: number;
  limit: number;
  totalPages: number;
  search?: string;
}

type TInitialState = {
  professors: TProfessor[]
  pagination: PaginationState
  count: number
  isLoading: boolean
  message: string | null
}

const initialState: TInitialState = {
  professors: [],
  pagination: {
    page: 1,
    limit: 10,
    totalPages: 0,
    search: '',
  },
  count: 0,
  isLoading: true,
  message: null,
};

const professors = createSlice({
  name: 'professors',
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
  extraReducers: (builder) => {
    builder
      .addCase(postProfessorThunk.pending, (state) => {
        state.isLoading = true;
        state.message = null;
      })
      .addCase(postProfessorThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.count++;
        state.professors = [payload.data, ...state.professors];

        if(state.professors.length > state.pagination.limit) {
          state.professors.pop();
        }
      })
      .addCase(postProfessorThunk.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getProfessorsThunk.pending, (state) => {
        state.isLoading = true;
        state.message = null;
      })
      .addCase(getProfessorsThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.professors = payload.rows;
        state.count = payload.count;
      })
      .addCase(getProfessorsThunk.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(patchProfessorThunk.pending, (state) => {
        state.isLoading = true;
        state.message = null;
      })
      .addCase(patchProfessorThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.professors = state.professors.map((el) =>
          el.id === payload.data.id ? payload.data : el,
        );
      });
  },
});

export const { setLimit, setPage, setSearch } = professors.actions;

export default professors.reducer;