import { Button, Flex, HStack } from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store/store'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useNotifications } from '@/hooks/useNotifications'
import Empty from '@/components/ui/Empty'
import InputUI from '@/components/ui/InputUI'
import { TCreateCourse } from '@/types/course'
import { postCourseThunk } from '@/store/courses/courses.thunks'

const CreateCourseModal = ({ onClose }: { onClose: () => void }) => {
  const t = useTranslations()
  const {
    register,
    handleSubmit,
    formState: { isValid },
    watch,
  } = useForm<TCreateCourse>()
  const dispatch = useDispatch<AppDispatch>()
  const { showErrorMessage, showSuccessMessage } = useNotifications()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onSubmit: SubmitHandler<TCreateCourse> = data => {
    setIsLoading(true)
    dispatch(postCourseThunk(data))
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
        <Empty>Create course information notify</Empty>
        <InputUI<TCreateCourse>
          label={'Name'}
          register={register('name', { required: 'Name is required' })}
          name={'name'}
          watch={watch}
        />
        <InputUI<TCreateCourse>
          label={'Description'}
          register={register('description', {
            required: 'Description is required',
          })}
          name="description"
          watch={watch}
        />
        <HStack width={'100%'} gap={4} marginY={4} justify={'end'}>
          <Button>{t('Cancel')}</Button>
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

export default CreateCourseModal
