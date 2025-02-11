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
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { DEGREE, EDUCATION_MODE } from '@/assets/constants';
import { FolderIcon } from '@/components/customIcon';
import Empty from '@/components/ui/Empty';
import FormInput from '@/components/ui/FormInput';
import SelectForm from '@/components/ui/selector/SelectForm';
import SelectorUI from '@/components/ui/selector/SelectorUI';
import { useNotifications } from '@/hooks/useNotifications';
import { postGroupThunk } from '@/store/groups/groups.thunks';
import { AppDispatch } from '@/store/store';
import { getUniversitiesThunk } from '@/store/universities/universities.thunks';
import { TGroupCreate, TName } from '@/types/groups';

const CreateGroup = ({ onClose }: { onClose: () => void }) => {
  const t = useTranslations();
  const {
    register,
    handleSubmit,
    formState: { isValid },
    control,
  } = useForm<TGroupCreate>();
  const dispatch = useDispatch<AppDispatch>();
  const { showErrorMessage, showSuccessMessage } = useNotifications();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [universities, setUniversities] = useState<TName[]>([]);

  const onSubmit: SubmitHandler<TGroupCreate> = (data) => {
    setIsLoading(true);
    dispatch(postGroupThunk(data))
      .unwrap()
      .then((res) => {
        showSuccessMessage(res.message);
        onClose();
      })
      .catch((err) => showErrorMessage(err.message))
      .finally(() => setIsLoading(false));
  };

  const fetchUniversityList = (item: string) => {
    dispatch(getUniversitiesThunk(item))
      .unwrap()
      .then((res) => setUniversities(res.data));
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
          {t('Create group')}
        </Heading>
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Flex
          flexDir={'column'}
          gap={4}
        >
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
        </Flex>
      </ModalBody>
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
    </ModalContent>
  );
};

export default CreateGroup;
