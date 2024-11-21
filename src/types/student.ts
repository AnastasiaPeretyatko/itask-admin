export type TStudentCreate = {
  fullName: string
  email: string
  groupId: string
  tel: string
}

export type TStudent = {
  id: string
  fullName: string
  tel: string
  user: {
    id: string
    email: string
  }
  group: {
    id: string
    groupCode: string
  }
}
