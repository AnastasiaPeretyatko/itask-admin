export type TCreateTeacherToCourse = {
  courseId: string
  professorId: string
  groupId: string
  semesterId: string
  position: string
}

export type TTeacherToCourse = {
  id: string
  professorId: string
  semesterGroupCourseId: string
  position: string
  createdAt: Date
  updatedAt: Date
  professor_id: string
  semester_group_course_id: string
  professor: {
    id: string
    user_id: string
    fullName: string
    tel: null | string
    description: null | string
    createdAt: Date
    updatedAt: Date
  }
  semesterGroupCourse: {
    id: string
    semesterGroupId: string
    courseId: string
    createdAt: Date
    updatedAt: Date
    course_id: string
    semester_group_id: string
    course: {
      id: string
      name: string
      description: string
      createdAt: Date
      updatedAt: Date
    }
    semesterGroup: {
      id: string
      semesterId: string
      groupId: string
      createdAt: string
      updatedAt: string
      semester_id: string
      group_id: string
      semester: {
        id: string
        name: string
        startDate: string
        endDate: string
        createdAt: Date
        updatedAt: Date
      }
      group: {
        groupCode: string
        id: string
        universityId: string
        degree: string
        educationMode: string
        course: number
        groupNumber: number
        isActive: boolean
        created_at: Date
        updated_at: Date
        university_id: string
        university: {
          id: string
          name: string
          createdAt: Date
          updatedAt: Date
        }
      }
    }
  }
}
