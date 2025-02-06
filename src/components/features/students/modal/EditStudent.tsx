import { Button, Flex, HStack } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import Empty from '@/components/ui/Empty';
import FormInput from '@/components/ui/FormInput';
import SelectForm from '@/components/ui/selector/SelectForm';
import { useNotifications } from '@/hooks/useNotifications';
import { AppDispatch } from '@/store/store';
import { patchStudentThunk } from '@/store/students/students.thunks';
import { TName } from '@/types/groups';
import { TStudent, TStudentCreate } from '@/types/student';

type Props = {
  onClose: () => void,
  student: TStudent
}

const EditStudent = ({ onClose, student }: Props) => {
  const t = useTranslations();
  const {
    register,
    handleSubmit,
    formState: { isValid },
    control,
  } = useForm<TStudentCreate>({
    defaultValues: {
      email: student.user.email,
      fullName: student.fullName,
      groupId: student.group.id,
      tel: student.tel,
    },
  });
  const dispatch = useDispatch<AppDispatch>();
  const { showErrorMessage, showSuccessMessage } = useNotifications();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [groups, setGroups] = useState<TName[]>([]);

  const onSubmit: SubmitHandler<TStudentCreate> = (data) => {
    setIsLoading(true);
    dispatch(patchStudentThunk({ id: student.id, data }))
      .unwrap()
      .then((res) => {
        showSuccessMessage(res.message);
        onClose();
      })
      .catch((err) => showErrorMessage(err.message))
      .finally(() => setIsLoading(false));
  };

  // const fetchGroupList = (item: string) => {
  //   dispatch(getGroupNameAndIdThunk(item))
  //     .unwrap()
  //     .then((res) => setGroups(res.data));
  // };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex
        flexDir={'column'}
        gap={4}
      >
        <Empty>{t('Create student information notify')}</Empty>
        <FormInput
          label={t('Full Name')}
          register={register('fullName', { required: 'Name is required' })}
        />
        <FormInput
          label={t('Email')}
          register={register('email', { required: 'Name is required' })}
        />
        <FormInput
          label={t('Tel')}
          register={register('tel', { required: 'Name is required' })}
        />
        <SelectForm
          label={t('Group')}
          array={groups}
          control={control}
          name="groupId"
          currentValue={student.group.groupCode}
          // onChangeState={fetchGroupList}
        />
        <HStack
          width={'100%'}
          gap={4}
          marginY={4}
          justify={'end'}
        >
          <Button
            variant={'secondary'}
            onClick={onClose}
          >
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
  );
};

export default EditStudent;
