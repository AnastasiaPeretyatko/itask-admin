import { createSlice } from '@reduxjs/toolkit';

export type TParams = {
  limit: number
  page: number
  search?: string
}

type TInitialState = {
  isOpenSidebar: boolean
}

const initialState: TInitialState = {
  isOpenSidebar: true,
};

export const settings = createSlice({
  name: 'user-setting',
  initialState,
  reducers: {
    changeStateSidebar: (state, { payload }: { payload: boolean }) => {
      state.isOpenSidebar = payload;
      localStorage.setItem('sidebar', String(payload));
    },
  },
});

export const { changeStateSidebar } = settings.actions;

export default settings.reducer;
