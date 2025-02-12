import {
  Input,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
} from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { ChangeHandler, SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
// import { Editor } from '@/components/Editor';
import FormInput from '@/components/ui/FormInput';
import Multiselect, { VIEW } from '@/components/ui/multiselect/Multiselect';
import PeopleItem from '@/components/ui/multiselect/PeopleProperty/PeopleItem';
import PeopleOption from '@/components/ui/multiselect/PeopleProperty/PeopleOption';
import { useNotifications } from '@/hooks/useNotifications';
import { getProfessorNamesRequest } from '@/services/professor.service';
import { postCourseThunk } from '@/store/courses/courses.thunks';
import { AppDispatch } from '@/store/store';
import { TCreateCourse } from '@/types/courses';
import { TName } from '@/types/groups';


const AddNewCourse = ({ onClose }: { onClose: () => void }) => {
  const [data, setData] = useState<string>();
  // const t = useTranslations();
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<TCreateCourse>();
  const dispatch = useDispatch<AppDispatch>();
  const { showErrorMessage, showSuccessMessage } = useNotifications();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [options, setOptions] = useState<TName[]>([]);

  const Editor = useMemo(() => dynamic(() => import('@/components/ui/Editor/Editor'), { ssr: false }), []);

  const onChangeContentEditor = (content: string) => {
    setData(content);
  };

  const onSubmit: SubmitHandler<TCreateCourse> = (data) => {
    console.log({

    });
    // setIsLoading(true);
    // dispatch(postCourseThunk(data))
    //   .unwrap()
    //   .then((res) => {
    //     showSuccessMessage(res.message);
    //     onClose();
    //   })
    //   .catch((err) => showErrorMessage(err.message))
    //   .finally(() => setIsLoading(false));
  };

  const fetchLestUser = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;
    const { data } = await getProfessorNamesRequest(search);
    setOptions(data);
  }, []);

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
      <ModalBody paddingX={'70px'}>
        <FormInput
          register={register('name')}
          label="Enter title..."
          withoutOutline
        />

        <Multiselect
          view={VIEW.LIST}
          options={options}
          label="Assign professors"
          renderItem={PeopleItem}
          renderOption={PeopleOption}
          onChange={fetchLestUser}
        />
        <Editor
          initialContent={data}
          onChange={onChangeContentEditor}
          // editable={true}
        />
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
