import {
  Button,
  HStack,
  IconButton, ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
} from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AiOutlineFullscreen, AiOutlineFullscreenExit } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
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
  const { register, handleSubmit } = useForm<TCreateCourse>();
  const dispatch = useDispatch<AppDispatch>();
  const { showErrorMessage, showSuccessMessage } = useNotifications();
  // const t = useTranslations();

  const [context, setContext] = useState<string>();
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [options, setOptions] = useState<TName[]>([]);
  const [localValue, setLocalValue] = useState<TName[]>([]);

  const Editor = useMemo(() => dynamic(() => import('@/components/ui/Editor/Editor'), { ssr: false }), []);

  const onChangeContentEditor = (content: string) => {
    setContext(content);
  };

  const onSubmit: SubmitHandler<TCreateCourse> = (data) => {
    const professorIds = localValue.map((item) => item.id);

    if(!data.name){
      showErrorMessage('Название курса является обязательным');
      return;
    }

    dispatch(postCourseThunk({ ...data, professorIds, description: context ?? '' }))
      .unwrap()
      .then((res) => {
        showSuccessMessage(res.message);
        onClose();
      })
      .catch((err) => showErrorMessage(err.message))
      .finally(() => setIsLoading(false));
  };

  const optionsRender = useMemo(() => {
    return options.filter((item) => !localValue.includes(item));
  }, [localValue, options]);

  const fetchLestUser = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;
    const { data } = await getProfessorNamesRequest(search);
    setOptions(data);
  }, []);

  const onDeleteValue = useCallback((value: TName) => {
    setLocalValue((prev) => prev.filter((item) => item.id !== value.id));
  }, []);

  const onChangeLocalValues = useCallback((value: TName) => {
    setLocalValue((prev) => [...prev, value]);
  }, []);

  return (
    <ModalContent
      as={'form'}
      maxW={isFullScreen ? '100vw' : 'xl'}
      height={isFullScreen ? '100vh' : 'auto'}
      onSubmit={handleSubmit(onSubmit)}
    >
      <ModalHeader
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <IconButton
          variant={'unstyledBtn'}
          fontSize={'xl'}
          aria-label="fullscreen"
          boxSize={10}
          icon={isFullScreen ? <AiOutlineFullscreenExit/> : <AiOutlineFullscreen/>}
          onClick={() => setIsFullScreen(!isFullScreen)}
        />
        <HStack>
          <Button
            size={'sm'}
            variant={'primary'}
            type="submit"
            isLoading={isLoading}
          >Опубликовать</Button>
          <ModalCloseButton position={'inherit'}/>
        </HStack>

      </ModalHeader>
      <ModalBody paddingX={'70px'}>
        <FormInput
          register={register('name')}
          label="Enter title..."
          withoutOutline
        />

        <Multiselect
          view={VIEW.LIST}
          value={localValue}
          options={optionsRender}
          label="Assign professors"
          renderItem={PeopleItem}
          renderOption={PeopleOption}
          onChangeInput={fetchLestUser}
          onChangeLocalValues={onChangeLocalValues}
          onDeleteValue={onDeleteValue}
        />
        <Editor
          initialContent={context}
          onChange={onChangeContentEditor}
          editable
        />
      </ModalBody>
    </ModalContent>
  );
};

export default AddNewCourse;
