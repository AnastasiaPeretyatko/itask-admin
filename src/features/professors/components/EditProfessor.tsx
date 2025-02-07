import { EditIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  Heading,
  Icon,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import Empty from '@/components/ui/Empty';
import FormInput from '@/components/ui/FormInput';
import { useNotifications } from '@/hooks/useNotifications';
import { patchProfessorThunk } from '@/store/professors/professors.thunks';
import { AppDispatch } from '@/store/store';
import { TProfessor } from '@/types/professor';

type Props = {
  professor: TProfessor
  onClose: () => void
}

const EditProfessor = ({ professor, onClose }: Props) => {
  const t = useTranslations();
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
  });
  const dispatch = useDispatch<AppDispatch>();
  const { showErrorMessage, showSuccessMessage } = useNotifications();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit: SubmitHandler<TProfessor> = (data) => {
    setIsLoading(true);
    dispatch(patchProfessorThunk({ id: professor.id, data }))
      .unwrap()
      .then(() => {
        showSuccessMessage({ title: 'Преподаватель успешно отредактирован' });
        onClose();
      })
      .catch(() => showErrorMessage({ title: 'Произошла ошибка' }))
      .finally(() => setIsLoading(false));
  };

  return (
    <ModalContent
      as={'form'}
      onSubmit={handleSubmit(onSubmit)}
    >
      <ModalHeader>
        <Icon
          as={EditIcon}
          width={6}
          height={6}
        />
        <Heading
          size={'md'}
          fontWeight={500}
        >
          {t('Create professor')}
        </Heading>
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Flex
          flexDir={'column'}
          gap={4}
        >
          <Empty>{t('Edit professor information notify')}.</Empty>
          <FormInput
            label="Full Name"
            register={register('fullName', {
              required: 'Full name is required',
            })}
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
          <ModalFooter>
            <Button>{t('Cancel')}</Button>
            <Button
              variant={'primary'}
              type="submit"
              isLoading={isLoading}
              isDisabled={!isValid}
            >
              {t('Save')}
            </Button>
          </ModalFooter>
        </Flex>
      </ModalBody>
    </ModalContent>
  );
};

export default EditProfessor;
