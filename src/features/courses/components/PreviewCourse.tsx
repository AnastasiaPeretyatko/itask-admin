import {
  Button,
  HStack,
  IconButton, ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  useBoolean,
} from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AiOutlineFullscreen, AiOutlineFullscreenExit } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import Empty from '@/components/ui/Empty';
import FormInput from '@/components/ui/FormInput';
import Multiselect, { VIEW } from '@/components/ui/multiselect/Multiselect';
import PeopleItem from '@/components/ui/multiselect/PeopleProperty/PeopleItem';
import PeopleOption from '@/components/ui/multiselect/PeopleProperty/PeopleOption';
import { useNotifications } from '@/hooks/useNotifications';
import { getProfessorNamesRequest } from '@/services/professor.service';
import { patchCourseThunk } from '@/store/courses/courses.thunks';
import { AppDispatch } from '@/store/store';
import { TCourse, TCreateCourse } from '@/types/courses';
import { TName } from '@/types/groups';


const PreviewCourse = ({ onClose, course }: { course: TCourse, onClose: () => void }) => {
  // const t = useTranslations();
  const dispatch = useDispatch<AppDispatch>();
  const { register, handleSubmit } = useForm<TCreateCourse>({ defaultValues: { name: course.name } });

  const { showErrorMessage, showSuccessMessage } = useNotifications();
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isEdit, setIsEdit] = useBoolean(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [context, setContext] = useState<string>(course.description);
  const [options, setOptions] = useState<TName[]>([]);
  const [localValue, setLocalValue] = useState<TName[]>([]);

  const Editor = useMemo(() => dynamic(() => import('@/components/ui/Editor/Editor'), { ssr: false }), []);

  const optionsRender = useMemo(() => options.filter((item) => !localValue.includes(item)), [localValue, options]);

  const onChangeContentEditor = (content: string) => setContext(content);

  const onSubmit: SubmitHandler<TCreateCourse> = (data) => {
    setIsLoading(true);

    const professorIds = localValue.map((item) => item.id);

    dispatch(patchCourseThunk({ id:course.id, data: {
      ...data,
      professorIds,
      description: context ?? '',
    } }))
      .unwrap()
      .then((res) => {
        showSuccessMessage(res);
        onClose();
      })
      .catch(showErrorMessage)
      .finally(() => setIsLoading(false));
  };


  const fetchLestUser = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    await getProfessorNamesRequest(value).then((res) => setOptions(res.data));
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
            variant={isEdit ? 'primary' : 'secondary'}
            type={isEdit ? 'button' : 'submit'}
            isLoading={isLoading}
            onClick={setIsEdit.toggle}
          >{isEdit ? 'Save' : 'Edit'}</Button>
          <ModalCloseButton position={'inherit'}/>
        </HStack>

      </ModalHeader>
      <ModalBody>
        <FormInput
          register={register('name', { required: 'Name is required' })}
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
          isDisabled={!isEdit}
        />
        {
          course.description ? (
            <Editor
              initialContent={context}
              onChange={onChangeContentEditor}
              editable={isEdit}
            />
          ) : (
            <Empty color={'text.pale'}>Description is empty. You can add it later</Empty>
          )
        }

      </ModalBody>
    </ModalContent>
  );
};

export default PreviewCourse;
