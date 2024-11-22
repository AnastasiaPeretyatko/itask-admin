import { Button, Flex, HStack } from '@chakra-ui/react'
import { useTranslations } from 'next-intl'
import { SubmitHandler, useForm } from 'react-hook-form'
import CustomeInput from '../ui/CustomeInput'
import Empty from '../ui/Empty'
import { Degree, EducationMode, TGroup } from '@/types/group'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store/store'
import { useState } from 'react'
import { patchGroupThunk } from '@/store/groups/createAsyncThunk.group'
import { useNotifications } from '@/hooks/useNotifications'
import SelectorGroupInput from '../ui/SelectorGroupInput'

type Props = {
  group: TGroup
  onClose: () => void
}

const EditGroup = ({ group, onClose }: Props) => {
  const t = useTranslations()
  const {
    register,
    handleSubmit,
    formState: { isValid },
    watch,
  } = useForm<TGroup>({
    defaultValues: {
      universityId: group.universityId,
      degree: group.degree,
      educationMode: group.educationMode,
      course: group.course,
      groupNumber: group.groupNumber,
    },
  })
  const dispatch = useDispatch<AppDispatch>()
  const { showErrorMessage, showSuccessMessage } = useNotifications()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onSubmit: SubmitHandler<TGroup> = data => {
    setIsLoading(true)
    dispatch(patchGroupThunk({ id: group.id, data }))
      .unwrap()
      .then(res => {
        showSuccessMessage(res.message)
        onClose()
      })
      .catch(err => showErrorMessage(err.message))
      .finally(() => setIsLoading(false))
  }
  const [selectedDegree, setSelectedDegree] =
    useState<keyof typeof Degree>('BACHELOR')
  const [selectedEducationMode, setSelectedEducationMode] =
    useState<keyof typeof EducationMode>('FULLTIME')
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex flexDir={'column'} gap={4}>
        <Empty>{t('Edit group information notify')}.</Empty>
        <CustomeInput<TGroup>
          label={t('University')}
          register={register('universityId', { required: 'University is required' })}
          watch={watch}
          name='universityId'
        />
        <SelectorGroupInput
          label={t('Degree')}
          enumObject={Degree}
          currentValue={selectedDegree}
          onChangeValue={value => setSelectedDegree(value)}
        />
        <SelectorGroupInput
          label={t('Education mode')}
          enumObject={EducationMode}
          currentValue={selectedEducationMode}
          onChangeValue={value => setSelectedEducationMode(value)}
        />
        <CustomeInput<TGroup>
          label={t('Course')}
          register={register('course', { required: 'Course is required' })}
          watch={watch}
          name='course'
        />
        <CustomeInput<TGroup>
          label={t('Group number')}
          register={register('groupNumber', { required: 'Group number is required' })}
          watch={watch}
          name='groupNumber'
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

export default EditGroup