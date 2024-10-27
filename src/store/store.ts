import { configureStore } from '@reduxjs/toolkit'
import professorsReducer from './professors/professors.slice'

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const store = configureStore({
  reducer: {
    professors: professorsReducer,
  },
})