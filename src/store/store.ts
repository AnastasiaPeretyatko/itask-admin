import { configureStore } from '@reduxjs/toolkit'
import professorsReducer from './professors/professors.slice'
import groupsReducer from './groups/groups.slice'
import settingsReducer from './user-setting/setting.slice'
import studentsReducer from './students/student.slice'

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const store = configureStore({
  reducer: {
    professors: professorsReducer,
    userSettings: settingsReducer,
    students: studentsReducer,
    groups: groupsReducer,
  },
})
