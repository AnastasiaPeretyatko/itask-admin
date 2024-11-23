import { Button, Flex, HStack } from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store/store'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useNotifications } from '@/hooks/useNotifications'
import { TStudentCreate } from '@/types/student'
import { postStudentThunk } from '@/store/students/students.thunks'
import Empty from '@/components/ui/Empty'
import InputUI from '@/components/ui/InputUI'
import { getGroupNameAndIdThunk } from '@/store/groups/groups.thunks'
import SelectForm from '@/components/ui/selector/SelectForm'
import { TName } from '@/types/groups'

const CreateStudent = ({ onClose }: { onClose: () => void }) => {
  const t = useTranslations()
  const {
    register,
    handleSubmit,
    formState: { isValid },
    watch,
    control,
  } = useForm<TStudentCreate>()
  const dispatch = useDispatch<AppDispatch>()
  const { showErrorMessage, showSuccessMessage } = useNotifications()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [groups, setGroups] = useState<TName[]>([])

  const onSubmit: SubmitHandler<TStudentCreate> = data => {
    setIsLoading(true)
    dispatch(postStudentThunk(data))
      .unwrap()
      .then(res => {
        showSuccessMessage(res.message)
        onClose()
      })
      .catch(err => showErrorMessage(err.message))
      .finally(() => setIsLoading(false))
  }

  const fetchGroupList = (item: string) => {
    dispatch(getGroupNameAndIdThunk(item))
      .unwrap()
      .then(res => setGroups(res.data))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex flexDir={'column'} gap={4}>
        <Empty>{t('Create student information notify')}</Empty>
        <InputUI<TStudentCreate>
          label={t('Fullname')}
          register={register('fullName', { required: 'Name is required' })}
          name="fullName"
          watch={watch}
        />
        <InputUI<TStudentCreate>
          label={t('Email')}
          register={register('email', { required: 'Name is required' })}
          name={'email'}
          watch={watch}
        />
        <InputUI<TStudentCreate>
          label={t('Tel')}
          register={register('tel', { required: 'Name is required' })}
          name={'tel'}
          watch={watch}
        />
        <SelectForm
          label={t('Group')}
          array={groups}
          control={control}
          name="groupId"
          onChangeState={fetchGroupList}
        />
        <HStack width={'100%'} gap={4} marginY={4} justify={'end'}>
          <Button variant={'secondary'} onClick={onClose}>
            {t('Cancel')}
          </Button>
          <Button
            variant={'primary'}
            type="submit"
            isLoading={isLoading}
            isDisabled={!isValid}
          >
            {t('Save')}
          </Button>
        </HStack>
      </Flex>
    </form>
  )
}

export default CreateStudent
