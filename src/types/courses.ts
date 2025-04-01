import { TGroup } from './groups';
import { TProfessor } from './professor';

export type TCreateCourse = {
  name: string
  description: string
  professorIds: string[]
}

export type TCourse = {
  id: string
  name: string
  description: string
  createdAt: Date
  updatedAt: Date
  assignments: CourseAssignment[]
}

export type TSemester = {
  id: string
  name: string,
  startDate: string,
  endDate: string,
  createdAt: string,
  updatedAt: string
}

export type CourseAssignment = {
  id: string
  course_id: string
  professor_id: string
  group_id: string
  semester_id: null | string
  createdAt: Date
  updatedAt: Date
  professor: TProfessor
}

export type CourseAssignmentType = {
  id: string,
  group: TGroup | null
  professors: TProfessor[] | null
  semesters: TSemester[] | null
}

export type Assignment = {
  id: string
  // "course_id": "c772673d-907c-4bfa-8d93-fd9093e5bfdb",
  // "professor_id": "783cedb0-4146-4db2-8930-4f4a5e481f47",
  // "group_id": "135bea57-1eb6-49fc-9efa-2336428a42d1",
  // "semester_id": "ace4578a-1b6a-48b2-a8ed-70aec52b4d1f",
  // "createdAt": "2025-03-03T19:01:08.196Z",
  // "updatedAt": "2025-03-03T19:01:08.196Z",
  professors: TProfessor
  groups: TGroup
  semesters: TSemester
}