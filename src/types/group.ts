export enum Degree {
  BACHELOR = 'bachelor',
  SPECIALIST = 'specialist',
  MASTER = 'master',
}

export enum EducationMode {
  FULLTIME = 'full-time',
  EXTRAMURAL = 'extramural',
}

export type TGroupCreate = {
  universityId: string
  degree: Degree
  educationMode: EducationMode
  course: string
  groupNumber: string
}

export type TUniversity = {
  id: string
  name: string
  createdAt: string
  updatedAt: string
}

export type TGroup = {
  groupCode: string
  id: string
  universityId: string
  degree: Degree
  educationMode: EducationMode
  course: number
  groupNumber: number
  isActive: boolean
  created_at: string
  updated_at: string
  university_id: string
  university: TUniversity
}