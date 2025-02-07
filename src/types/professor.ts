export type TProfessorCreate = {
  email: string
  fullName: string
  description: string
}

type TUser = { email: string }

export type TProfessor = {
  createdAt: string
  description: null | string
  fullName: string
  id: string
  tel: null | string
  updatedAt: string
  user: TUser
  user_id: string
}