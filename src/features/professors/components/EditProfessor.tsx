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
        showSuccessMessage('Преподаватель успешно отредактирован' );
        onClose();
      })
      .catch(() => showErrorMessage('Произошла ошибка'))
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
          Редактировать преподавателя
        </Heading>
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Flex
          flexDir={'column'}
          gap={4}
        >
          <Empty>
            Измененные данные о преподавателе будут обновлены в системе и сразу станут доступными на платформе,
             а преподаватель получит уведомление об изменениях, если это необходимо
          </Empty>
          <FormInput
            label="ФИО"
            register={register('fullName', {
              required: 'Необходимо указать ФИО',
            })}
            errorMessage={errors.fullName?.message}
          />
          <FormInput
            label="Номер телефона"
            register={register('tel')}
            errorMessage={errors.tel?.message}
          />
          <FormInput
            label="Описание"
            register={register('description')}
            errorMessage={errors.description?.message}
          />
          <ModalFooter paddingBottom={0}>
            <Button>Отмена</Button>
            <Button
              variant={'primary'}
              type="submit"
              isLoading={isLoading}
              isDisabled={!isValid}
            >
              Сохранить
            </Button>
          </ModalFooter>
        </Flex>
      </ModalBody>
    </ModalContent>
  );
};

export default EditProfessor;
