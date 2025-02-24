import {
  Button,
  Flex,
  Heading, Icon,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@chakra-ui/react';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { FolderIcon } from '@/components/customIcon';
import Empty from '@/components/ui/Empty';
import FormInput from '@/components/ui/FormInput';
import SelectForm from '@/components/ui/selector/SelectForm';
import { useNotifications } from '@/hooks/useNotifications';
import { getGroupNameAndIdThunk } from '@/store/groups/groups.thunks';
import { AppDispatch } from '@/store/store';
import { postStudentThunk } from '@/store/students/students.thunks';
import { TGroup, TName } from '@/types/groups';
import { TStudentCreate } from '@/types/student';

type Props = {
  onClose: () => void
  group?: TGroup
}

const CreateStudent = ({ onClose, group }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { isValid },
    control,
  } = useForm<TStudentCreate>({
    defaultValues: {
      groupId: group?.id,
    },
  });
  const dispatch = useDispatch<AppDispatch>();
  const { showErrorMessage, showSuccessMessage } = useNotifications();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [groups, setGroups] = useState<TName[]>([]);

  const onSubmit: SubmitHandler<TStudentCreate> = (data) => {
    setIsLoading(true);
    dispatch(postStudentThunk(data))
      .unwrap()
      .then((res) => {
        showSuccessMessage(res.message);
        onClose();
      })
      .catch((err) => showErrorMessage(err.message))
      .finally(() => setIsLoading(false));
  };

  const fetchGroupList = (item: string) => {
    dispatch(getGroupNameAndIdThunk(item))
      .unwrap()
      .then((res) => setGroups(res.data));
  };

  return (
    <ModalContent
      as={'form'}
      onSubmit={handleSubmit(onSubmit)}
    >
      <ModalHeader>
        <Icon
          as={FolderIcon}
          width={'6'}
          height={'6'}
        />
        <Heading
          size={'md'}
          fontWeight={500}
        >
          {('Create student')}
        </Heading>
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Flex
          flexDir={'column'}
          gap={4}
        >
          <Empty>{('Create student information notify')}</Empty>
          <FormInput
            label={('Full Name')}
            register={register('fullName', { required: 'Name is required' })}
          />
          <FormInput
            label={('Email')}
            register={register('email', { required: 'Name is required' })}
          />
          <FormInput
            label={('Tel')}
            register={register('tel', { required: 'Name is required' })}
          />
          <SelectForm
            label={('Group')}
            array={groups}
            control={control}
            name="groupId"
            currentValue={group?.groupCode}
            onChangeState={fetchGroupList}
          />
        </Flex>
      </ModalBody>
      <ModalFooter>
        <Button onClick={onClose}>
          {('Cancel')}
        </Button>
        <Button
          variant={'primary'}
          type="submit"
          isLoading={isLoading}
          isDisabled={!isValid}
        >
          {('Save')}
        </Button>
      </ModalFooter>
    </ModalContent>
  );
};

export default CreateStudent;
