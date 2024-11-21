import { Button, Flex, HStack } from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store/store'
import { useState } from 'react'
import { postProfessorThunk } from '@/store/professors/professors.thunks'
import { useTranslations } from 'next-intl'
import { useNotifications } from '@/hooks/useNotifications'
import { TStudentCreate } from '@/types/student'
import { postStudentThunk } from '@/store/students/students.thunks'
import Empty from '@/components/ui/Empty'
import InputUI from '@/components/ui/InputUI'

const CreateStudent = ({ onClose }: { onClose: () => void }) => {
  const t = useTranslations()
  const {
    register,
    handleSubmit,
    formState: { isValid },
    watch,
  } = useForm<TStudentCreate>()
  const dispatch = useDispatch<AppDispatch>()
  const { showErrorMessage, showSuccessMessage } = useNotifications()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onSubmit: SubmitHandler<TStudentCreate> = data => {
    setIsLoading(true)
    dispatch(postStudentThunk(data))
      .unwrap()
      .then(res => {
        // showSuccessMessage(res.message)
        onClose()
      })
      // .catch(err => showErrorMessage(err.message))
      .finally(() => setIsLoading(false))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex flexDir={'column'} gap={4}>
        <Empty>{t("Create student information notify")}</Empty>
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
          label={'Group id'}
          register={register('groupId', { required: 'Name is required' })}
          name={'groupId'}
          watch={watch}
        />
        <InputUI<TStudentCreate>
          label={t('Tel')}
          register={register('tel', { required: 'Name is required' })}
          name={'tel'}
          watch={watch}
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
