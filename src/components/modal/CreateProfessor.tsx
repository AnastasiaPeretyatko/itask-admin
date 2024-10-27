import { Button, Flex, HStack } from '@chakra-ui/react'
import { useTranslations } from 'next-intl'
import { SubmitHandler, useForm } from 'react-hook-form'
import CustomeInput from '../ui/CustomeInput'
import Empty from '../ui/Empty'
import { TProfessorCreate } from '@/types/professor'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store/store'
import { postProfessorThunk } from '@/store/professors/professors.slice'
import { useNotifications } from '@/hooks/useNotifications'
import { useState } from 'react'

const CreateProfessor = ({ onClose }: { onClose: () => void }) => {
  const {
    register,
    handleSubmit,
    formState: { isValid },
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
        <Empty>
          {
            'You are going to create a new professor An account on the platform will be automatically created for this teacher'
          }
        </Empty>
        <CustomeInput
          label={'Email'}
          register={register('email', { required: 'Name is required' })}
        />
        <CustomeInput
          label={'Full name'}
          register={register('fullName', { required: 'Name is required' })}
        />
        {/* <SelectorInput label={t('Role')} /> */}
        <HStack width={'100%'} gap={4} marginY={4} justify={'end'}>
          <Button>{'Cancel'}</Button>
          <Button
            variant={'primary'}
            type="submit"
            isLoading={isLoading}
            isDisabled={!isValid}
          >
            {/* {t('Save')} */}
          </Button>
        </HStack>
      </Flex>
    </form>
  )
}

export default CreateProfessor
