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

export type Assignment = {
  id: string
  professor: TProfessor
  group: TGroup
  semester: TSemester
}