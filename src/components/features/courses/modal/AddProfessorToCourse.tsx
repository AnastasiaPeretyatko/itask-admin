import InputUI from '@/components/ui/InputUI'
import SelectForm from '@/components/ui/selector/SelectForm'
import { useNotifications } from '@/hooks/useNotifications'
import { getProfessorNamesRequest } from '@/services/professor.service'
import { getSemestersOnNameRequest } from '@/services/semester.service'
import { getGroupNameAndIdThunk } from '@/store/groups/groups.thunks'
import { addTeacherToCourseThunk } from '@/store/professor-course/professor-course.thunks'
import { AppDispatch } from '@/store/store'
import { TName } from '@/types/groups'
import { TCreateTeacherToCourse } from '@/types/professor-course'
import { Button, Flex, HStack } from '@chakra-ui/react'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

const AddProfessorToCourseModal = ({
  onClose,
  courseId,
}: {
  onClose: () => void
  courseId: string
}) => {
  const dispatch = useDispatch<AppDispatch>()
  // const {data: professors} = useSelector((state: RootState) => state.professors)
  const [professors, setProfessors] = useState<TName[]>([])
  const [groups, setGroups] = useState<TName[]>([])
  const [semesters, setSemesters] = useState<TName[]>([])
  const {showErrorMessage, showSuccessMessage} = useNotifications()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const {
    control,
    register,
    formState: { isValid },
    watch,
    handleSubmit
  } = useForm<TCreateTeacherToCourse>({
    defaultValues: {
      courseId,
    },
  })

  const fetchProfessorList = async (item: string) => {
    await getProfessorNamesRequest(item).then(res => {
      setProfessors(res.data)
    })
  }

  const fetchGroupList = (item: string) => {
    dispatch(getGroupNameAndIdThunk(item))
      .unwrap()
      .then(res => setGroups(res.data))
  }

  const fetchSemesterList = async (item: string) => {
    await getSemestersOnNameRequest(item).then(res => setSemesters(res.data))
  }

    const onSubmit: SubmitHandler<TCreateTeacherToCourse> = data => {
      setIsLoading(true)
      dispatch(addTeacherToCourseThunk(data))
        .unwrap()
        .then(res => {
          showSuccessMessage(res.message)
          onClose()
        })
        .catch(err => showErrorMessage(err.message))
        .finally(() => setIsLoading(false))
    }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex flexDir={'column'} gap={4}>
        <SelectForm
          label="Преподаватель"
          array={professors}
          control={control}
          name="professorId"
          onChangeState={fetchProfessorList}
        />
        <SelectForm
          label="Группа"
          array={groups}
          control={control}
          name="groupId"
          onChangeState={fetchGroupList}
        />
        <SelectForm
          label="Семестр"
          array={semesters}
          control={control}
          name="semesterId"
          onChangeState={fetchSemesterList}
        />
        <InputUI<TCreateTeacherToCourse>
          label={'Позиция'}
          register={register('position', { required: 'Name is required' })}
          name={'position'}
          watch={watch}
        />
        <HStack width={'100%'} gap={4} marginY={4} justify={'end'}>
          <Button variant={'secondary'} onClick={onClose}>
            Отмена
          </Button>
          <Button
            variant={'primary'}
            type="submit"
            isLoading={isLoading}
            isDisabled={!isValid}
          >
            Сохранить
          </Button>
        </HStack>
      </Flex>
    </form>
  )
}

export default AddProfessorToCourseModal
