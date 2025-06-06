import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button, HStack,
  IconButton,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useBoolean,
} from '@chakra-ui/react';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AiOutlineFullscreen, AiOutlineFullscreenExit } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import Empty from '@/components/ui/Empty';
import SelectForm from '@/components/ui/selector/SelectForm';
import { useNotifications } from '@/hooks/useNotifications';
import { getProfessorNamesRequest } from '@/services/professor.service';
import { getSemestersOnNameRequest } from '@/services/semester.service';
import { assignment } from '@/store/courses/courses.thunks';
import { AppDispatch, RootState } from '@/store/store';
import { Assignment } from '@/types/courses';
import { TName } from '@/types/groups';

export type CreateAssignment = {
  id: string
  courseId: string
  groupId: string
  professorId: string
  semesterId: string
}

type AddNewRecordProps = {
  onClose: () => void,
  data: Assignment,
  courseId?: string
}

const AddNewRecord = ({ onClose, data, courseId } : AddNewRecordProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { current } = useSelector((state:RootState) => state.course);
  const { handleSubmit, control } = useForm<CreateAssignment>({
    defaultValues: {
      id: data.id,
      groupId: data.group?.id,
      courseId: courseId,
    },
  },
  );
  const { showErrorMessage, showSuccessMessage } = useNotifications();

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useBoolean(false);
  const [semester, setSemester] = useState<TName[]>([]);
  const [professor, setProfessors] = useState<TName[]>([]);


  const onSubmit: SubmitHandler<CreateAssignment> = (data) => {
    setIsLoading.on();
    console.log(data);
    dispatch(assignment.create(data))
      .unwrap()
      .then((res) => {
        showSuccessMessage(res.message);
        onClose();
      })
      .catch(showErrorMessage)
      .finally(setIsLoading.off);
  };

  const fetchSemesterList = async(search: string) => {
    await getSemestersOnNameRequest(search).then(({ data }) => setSemester(data));
  };

  const fetchProfessorList = async (item: string) => {
    await getProfessorNamesRequest(item).then(({ data }) => setProfessors(data));
  };

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
        <HStack>
          <IconButton
            variant={'unstyledBtn'}
            fontSize={'xl'}
            aria-label="fullscreen"
            boxSize={10}
            icon={isFullScreen ? <AiOutlineFullscreenExit/> : <AiOutlineFullscreen/>}
            onClick={() => setIsFullScreen(!isFullScreen)}
          />
          <Breadcrumb
            fontWeight={'normal'}
            fontSize={'md'}
          >
            <BreadcrumbItem color={'text.lighter'}>
              <BreadcrumbLink>{current?.name}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink>{data.group?.groupCode}</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </HStack>
        <ModalCloseButton position={'inherit'}/>
      </ModalHeader>
      <ModalBody>
        <Empty
          color={'text.lighter'}
          marginBottom={2}
        >
          Укажите в каком семестре будет обучать преподаватель в данной группе. Изменения сразу в ступят в силу и будет отобржаться на странице курса.
        </Empty>
        <SelectForm
          label={('Semester')}
          array={semester}
          control={control}
          name="semesterId"
          onChangeState={fetchSemesterList}
        />
        <SelectForm
          label={('Professor')}
          array={professor}
          control={control}
          name="professorId"
          onChangeState={fetchProfessorList}
        />
      </ModalBody>
      <ModalFooter>
        <Button
          variant={'unstyled'}
          onClick={onClose}
        >Отменить</Button>
        <Button
          variant={'primary'}
          type="submit"
          isDisabled={isLoading}
        >Создать</Button>

      </ModalFooter>
    </ModalContent>
  );
};

export default AddNewRecord;