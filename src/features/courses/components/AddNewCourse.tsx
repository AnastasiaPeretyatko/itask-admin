import {
  Input,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
} from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
// import { Editor } from '@/components/Editor';
import Multiselect, { VIEW } from '@/components/ui/multiselect/Multiselect';
import PeopleItem from '@/components/ui/multiselect/PeopleProperty/PeopleItem';
import PeopleOption from '@/components/ui/multiselect/PeopleProperty/PeopleOption';
import { useNotifications } from '@/hooks/useNotifications';
import { postCourseThunk } from '@/store/courses/courses.thunks';
import { AppDispatch } from '@/store/store';
import { TCreateCourse } from '@/types/courses';

const AddNewCourse = ({ onClose }: { onClose: () => void }) => {
  // const [data, setData] = useState();
  const t = useTranslations();
  const {
    // register,
    handleSubmit,
    formState: { isValid },
  } = useForm<TCreateCourse>();
  const dispatch = useDispatch<AppDispatch>();
  const { showErrorMessage, showSuccessMessage } = useNotifications();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const Editor = useMemo(() => dynamic(() => import('@/components/Editor'), { ssr: false }), []);

  const onSubmit: SubmitHandler<TCreateCourse> = (data) => {
    setIsLoading(true);
    dispatch(postCourseThunk(data))
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
        {/* <Icon
          as={FolderIcon}
          width={'6'}
          height={'6'}
        />
        <Heading
          size={'md'}
          fontWeight={500}
        >
          {t('Create course')}
        </Heading> */}
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Input
          variant={'unstyled'}
          placeholder="Enter title..."
          fontWeight={600}
          fontSize={'2xl'}
        />
        <Multiselect
          view={VIEW.LIST}
          options={[1, 2, 3, 4, 5]}
          label="Assign professors"
          renderItem={PeopleItem}
          renderOption={PeopleOption}
        />
        <Editor onChange={(content) => {console.log('ldfldfl', content);}}/>
        {/* <Flex
          flexDir={'column'}
          gap={4}
        >
          <Empty>Create course information notify</Empty>
          <FormInput
            label={'Name'}
            register={register('name', { required: 'Name is required' })}
          />
          <FormInput
            label={'Description'}
            register={register('description', {
              required: 'Description is required',
            })}
          />
          <Multiselect/>
        </Flex> */}
      </ModalBody>
      {/* <ModalFooter>
        <Button>{t('Cancel')}</Button>
        <Button
          variant={'primary'}
          type="submit"
          isLoading={isLoading}
          isDisabled={!isValid}
        >
          {t('Save')}
        </Button>
      </ModalFooter> */}
    </ModalContent>
  );
};

export default AddNewCourse;
