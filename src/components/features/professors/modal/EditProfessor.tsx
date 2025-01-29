import { Button, Flex, HStack } from '@chakra-ui/react'
import { useTranslations } from 'next-intl'
import { SubmitHandler, useForm } from 'react-hook-form'
import { TProfessor } from '@/types/professor'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store/store'
import { useState } from 'react'
import { patchProfessorThunk } from '@/store/professors/professors.thunks'
import { useNotifications } from '@/hooks/useNotifications'
import Empty from '@/components/ui/Empty'
import FormInput from '@/components/ui/FormInput'

type Props = {
  professor: TProfessor
  onClose: () => void
}

const EditProfessor = ({ professor, onClose }: Props) => {
  const t = useTranslations()
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<TProfessor>({
    defaultValues: {
      tel: professor.tel,
      description: professor.description,
      fullName: professor.fullName,
    },
  })
  const dispatch = useDispatch<AppDispatch>()
  const { showErrorMessage, showSuccessMessage } = useNotifications()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onSubmit: SubmitHandler<TProfessor> = data => {
    setIsLoading(true)
    dispatch(patchProfessorThunk({ id: professor.id, data }))
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
        <Empty>{t('Edit professor information notify')}.</Empty>
        <FormInput
          label="Full Name"
          register={register('fullName')}
          errorMessage={errors.fullName?.message}
        />
        <FormInput
          label="Tel"
          register={register('tel')}
          errorMessage={errors.tel?.message}
        />
        <FormInput
          label="Description"
          register={register('description')}
          errorMessage={errors.description?.message}
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

export default EditProfessor
