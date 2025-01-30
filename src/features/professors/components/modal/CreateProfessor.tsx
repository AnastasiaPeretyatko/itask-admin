import {
  Button,
  Heading,
  Icon,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { TProfessorCreate } from '@/types/professor'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store/store'
import { useState } from 'react'
import { postProfessorThunk } from '@/store/professors/professors.thunks'
import { useTranslations } from 'next-intl'
import { useNotifications } from '@/hooks/useNotifications'
import Empty from '@/components/ui/Empty'
import FormInput from '@/components/ui/FormInput'
import { FolderIcon } from '@/components/customIcon'
import TextareaUI from '@/components/ui/TextareaUI'

const CreateProfessor = ({ onClose }: { onClose: () => void }) => {
  const t = useTranslations()
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
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
    <ModalContent as={'form'} onSubmit={handleSubmit(onSubmit)}>
      <ModalHeader
        display={'flex'}
        gap={4}
        textTransform={'unset'}
        alignItems={'center'}
        pb={0}
      >
        <Icon as={FolderIcon} width={'6'} height={'6'} />
        <Heading size={'md'} fontWeight={500}>
          {t('Create professor')}
        </Heading>
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody display={'flex'} flexDir={'column'} gap={4}>
        <Empty>{t('Create professor information notify')}.</Empty>
        <FormInput
          register={register('fullName', { required: 'Full name is required' })}
          label="Full Name"
          errorMessage={errors.fullName?.message}
        />
        <FormInput
          register={register('email', { required: 'Email is required' })}
          label="Email"
          errorMessage={errors.email?.message}
        />
        <TextareaUI
          register={register('description')}
          label={'Description'}
          errorMessage={errors.description?.message}
        />
      </ModalBody>
      <ModalFooter gap={4}>
        <Button onClick={onClose}>{t('Cancel')}</Button>
        <Button
          variant={'primary'}
          type="submit"
          isLoading={isLoading}
          isDisabled={!isValid}
        >
          {t('Save')}
        </Button>
      </ModalFooter>
    </ModalContent>
  )
}

export default CreateProfessor
