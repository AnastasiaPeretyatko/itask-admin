import { Button, Flex, HStack } from '@chakra-ui/react'
import { useTranslations } from 'next-intl'
import { SubmitHandler, useForm } from 'react-hook-form'
import FormInput from '@/components/ui/FormInput'
import Empty from '@/components/ui/Empty'
import { TGroup, TName } from '@/types/groups'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store/store'
import { useState } from 'react'
import { patchGroupThunk } from '@/store/groups/groups.thunks'
import { useNotifications } from '@/hooks/useNotifications'
import SelectorUI from '@/components/ui/selector/SelectorUI'
import { DEGREE, EDUCATION_MODE } from '@/assets/constants'
import { getUniversitiesThunk } from '@/store/universities/universities.thunks'
import SelectForm from '@/components/ui/selector/SelectForm'

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
    control,
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
  const [universities, setUniversities] = useState<TName[]>([])

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

  const fetchUniversityList = (item: string) => {
    dispatch(getUniversitiesThunk(item))
      .unwrap()
      .then(res => setUniversities(res.data))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex flexDir={'column'} gap={4}>
        <Empty>{t('Edit group information notify')}.</Empty>
        <SelectForm
          label={t('University')}
          array={universities}
          control={control}
          name="universityId"
          // onChangeState={fetchUniversityList}
          currentValue={group.university.name}
        />
        <SelectorUI
          label={t('Degree')}
          name="degree"
          control={control}
          options={DEGREE}
        />
        <SelectorUI
          label={t('Education mode')}
          name="educationMode"
          control={control}
          options={EDUCATION_MODE}
        />
        <FormInput
          label={t('Course')}
          register={register('course', { required: 'Course is required' })}
        />
        <FormInput
          label={t('Group number')}
          register={register('groupNumber', {
            required: 'Group number is required',
          })}
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
