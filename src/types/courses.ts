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
  course_assignment: CourseAssignment[]
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
  professors: TProfessor | null
  semesters: null
}