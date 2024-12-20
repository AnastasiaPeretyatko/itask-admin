import { Button, Flex, HStack } from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { TProfessorCreate } from '@/types/professor'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store/store'
import { useState } from 'react'
import { postProfessorThunk } from '@/store/professors/professors.thunks'
import { useTranslations } from 'next-intl'
import { useNotifications } from '@/hooks/useNotifications'
import Empty from '@/components/ui/Empty'
import InputUI from '@/components/ui/InputUI'

const CreateProfessor = ({ onClose }: { onClose: () => void }) => {
  const t = useTranslations()
  const {
    register,
    handleSubmit,
    formState: { isValid },
    watch,
  } = useForm<TProfessorCreate>()
  const dispatch = useDispatch<AppDispatch>()
  const { showErrorMessage, showSuccessMessage } = useNotifications()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onSubmit: SubmitHandler<TProfessorCreate> = data => {
    setIsLoading(true)
    dispatch(postProfessorThunk(data))
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
        <Empty>{t('Create professor information notify')}.</Empty>
        <InputUI<TProfessorCreate>
          label={'Email'}
          register={register('email', { required: 'Name is required' })}
          name={'email'}
          watch={watch}
        />
        <InputUI<TProfessorCreate>
          label={'Full name'}
          register={register('fullName', { required: 'Name is required' })}
          name="fullName"
          watch={watch}
        />
        {/* <SelectorInput label={t('Role')} /> */}
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

export default CreateProfessor
