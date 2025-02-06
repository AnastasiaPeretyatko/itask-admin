import {
  Button,
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
import { FolderIcon } from '@/components/customIcon';
import Empty from '@/components/ui/Empty';
import FormInput from '@/components/ui/FormInput';
import TextareaUI from '@/components/ui/TextareaUI';
import { useNotifications } from '@/hooks/useNotifications';
import { postProfessorThunk } from '@/store/professors/professors.thunks';
import { AppDispatch } from '@/store/store';
import { TProfessorCreate } from '@/types/professor';

const CreateProfessor = ({ onClose }: { onClose: () => void }) => {
  const t = useTranslations();
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<TProfessorCreate>();
  const dispatch = useDispatch<AppDispatch>();
  const { showErrorMessage, showSuccessMessage } = useNotifications();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit: SubmitHandler<TProfessorCreate> = (data) => {
    setIsLoading(true);
    dispatch(postProfessorThunk(data))
      .unwrap()
      .then((res) => {
        showSuccessMessage(res.message);
        onClose();
      })
      .catch((err) => showErrorMessage(err.message))
      .finally(() => setIsLoading(false));
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
          {t('Create professor')}
        </Heading>
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Empty marginBottom={2}>{t('Create professor information notify')}.</Empty>
        <FormInput
          register={register('fullName', { required: 'Full name is required' })}
          label={t('Full Name')}
          errorMessage={errors.fullName?.message}
        />
        <FormInput
          register={register('email', { required: 'Email is required' })}
          label={t('Email')}
          errorMessage={errors.email?.message}
        />
        <TextareaUI
          register={register('description')}
          label={t('Description')}
          errorMessage={errors.description?.message}
        />
      </ModalBody>
      <ModalFooter>
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
  );
};

export default CreateProfessor;
