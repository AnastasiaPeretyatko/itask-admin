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
import { getGroupNameAndIdRequest } from '@/services/groups.service';
import { getProfessorNamesRequest } from '@/services/professor.service';
import { getSemestersOnNameRequest } from '@/services/semester.service';
import { assignment } from '@/store/courses/courses.thunks';
import { AppDispatch, RootState } from '@/store/store';
import { TName } from '@/types/groups';

export type CreateAssignment = {
  id: string
  courseId: string
  groupId: string
  professorId: string
  semesterId: string
}

type AddNewRecourdProps = {
  onClose: () => void,
}

const AddNewGroupToCourse = ({ onClose } : AddNewRecourdProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { current } = useSelector((state:RootState) => state.course);
  const { handleSubmit, control } = useForm<CreateAssignment>({
    defaultValues: { courseId: current?.id },
  } );
  const { showErrorMessage, showSuccessMessage } = useNotifications();

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useBoolean(false);
  const [semesters, setSemesters] = useState<TName[]>([]);
  const [professors, setProfessors] = useState<TName[]>([]);
  const [groups, setGroups] = useState<TName[]>([]);

  const onSubmit: SubmitHandler<CreateAssignment> = (data) => {
    setIsLoading.on();
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
    await getSemestersOnNameRequest(search).then(({ data }) => setSemesters(data));
  };

  const fetchProfessorList = async (item: string) => {
    await getProfessorNamesRequest(item).then(({ data }) => setProfessors(data));
  };
  const fetchGroupList = async (item: string) => {
    await getGroupNameAndIdRequest(item).then(({ data }) => setGroups(data));
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
          label={('Group')}
          array={groups}
          control={control}
          name="groupId"
          onChangeState={fetchGroupList}
        />
        <SelectForm
          label={('Semester')}
          array={semesters}
          control={control}
          name="semesterId"
          onChangeState={fetchSemesterList}
        />
        <SelectForm
          label={('Professor')}
          array={professors}
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

export default AddNewGroupToCourse;