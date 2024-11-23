import { Button, Flex, HStack, Select } from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import CustomeInput from '../ui/CustomeInput'
import Empty from '../ui/Empty'
import { Degree, EducationMode, TGroupCreate } from '@/types/group'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store/store'
import { useState } from 'react'
import { postGroupThunk } from '@/store/groups/createAsyncThunk.group'
import { useTranslations } from 'next-intl'
import { useNotifications } from '@/hooks/useNotifications'
import SelectorGroupInput from '../ui/SelectorGroupInput'

const CreateGroup = ({ onClose }: { onClose: () => void }) => {
  const t = useTranslations()
  const {
    register,
    handleSubmit,
    formState: { isValid },
    watch,
  } = useForm<TGroupCreate>()
  const dispatch = useDispatch<AppDispatch>()
  const { showErrorMessage, showSuccessMessage } = useNotifications()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onSubmit: SubmitHandler<TGroupCreate> = data => {
    setIsLoading(true)
    dispatch(postGroupThunk(data))
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
        <Empty>{t('Create group information notify')}.</Empty>
        <CustomeInput<TGroupCreate>
          label={t('University')}
          register={register('universityId', {
            required: 'University is required',
          })}
          watch={watch}
          name="universityId"
        />

        <SelectorGroupInput
          label={t('Dergee')}
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

        <CustomeInput<TGroupCreate>
          label={t('Course')}
          register={register('course', { required: 'Course is required' })}
          watch={watch}
          name="course"
        />
        <CustomeInput<TGroupCreate>
          label={t('Group number')}
          register={register('groupNumber', {
            required: 'Group number is required',
          })}
          watch={watch}
          name="groupNumber"
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

export default CreateGroup