import { configureStore } from '@reduxjs/toolkit';
import coursesReducer from './courses/courses.slice';
import currentGroupReducer from './groups/current_group.slice';
import groupsReducer from './groups/groups.slice';
import professorCourseReducer from './professor-course/professor-course.slice';
import professorsReducer from './professors/professors.slice';
import studentsReducer from './students/student.slice';
import settingsReducer from './user-setting/setting.slice';

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const store = configureStore({
  reducer: {
    professors: professorsReducer,
    userSettings: settingsReducer,
    students: studentsReducer,
    groups: groupsReducer,
    currentGroup: currentGroupReducer,
    courses: coursesReducer,
    professorCourse: professorCourseReducer,
  },
});
