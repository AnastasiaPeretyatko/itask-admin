import { Button, Flex, HStack } from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Empty from '@/components/ui/Empty'
import { TGroupCreate, TName } from '@/types/groups'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store/store'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useNotifications } from '@/hooks/useNotifications'
import SelectorUI from '@/components/ui/selector/SelectorUI'
import { postGroupThunk } from '@/store/groups/groups.thunks'
import InputUI from '@/components/ui/InputUI'
import SelectForm from '@/components/ui/selector/SelectForm'
import { getUniversitiesThunk } from '@/store/universities/universities.thunks'
import { DEGREE, EDUCATION_MODE } from '@/assets/constants'

const CreateGroup = ({ onClose }: { onClose: () => void }) => {
  const t = useTranslations()
  const {
    register,
    handleSubmit,
    formState: { isValid },
    watch,
    control
  } = useForm<TGroupCreate>()
  const dispatch = useDispatch<AppDispatch>()
  const { showErrorMessage, showSuccessMessage } = useNotifications()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [universities, setUniversities] = useState<TName[]>([])

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

  const fetchUniversityList = (item: string) => {
    dispatch(getUniversitiesThunk(item))
      .unwrap()
      .then(res => setUniversities(res.data))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex flexDir={'column'} gap={4}>
        <Empty>{t('Create group information notify')}.</Empty>
        <SelectForm
          label={t('University')}
          array={universities}
          control={control}
          name="universityId"
          onChangeState={fetchUniversityList}
        />
        <SelectorUI
          label={t('Degree')}
          name="degree"
          control={control}
          options={DEGREE}
        />
        <SelectorUI
          label={t('Education mode')}
          name='educationMode'
          control={control}
          options={EDUCATION_MODE}
        />
        <InputUI<TGroupCreate>
          label={t('Course')}
          register={register('course', { required: 'Course is required' })}
          watch={watch}
          name="course"
        />
        <InputUI<TGroupCreate>
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
