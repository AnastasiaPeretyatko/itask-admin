import { EditIcon } from '@chakra-ui/icons';
import { Alert, AlertIcon, Box, Button, Heading, HStack, Input, Skeleton, VStack } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '@/components/Layout/AppLayout';
import { SaveIcon } from '@/components/customIcon';
import WindowModal from '@/components/modal/WindowModal';
import SearchInput from '@/components/ui/SearchInput';
import AddNewGroupToCourse from '@/features/courses/components/AddNewGroupToCourse';
import TableCourseInfo from '@/features/courses/components/TableCourseInfo';
import { useNotifications } from '@/hooks/useNotifications';
import { course, patchCourseThunk } from '@/store/courses/courses.thunks';
import { AppDispatch, RootState } from '@/store/store';
import { TCreateCourse } from '@/types/courses';

const Editor = dynamic(() => import('@/components/ui/Editor/Editor'), { ssr: false });

const CoursePage = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { showSuccessMessage, showErrorMessage } = useNotifications();
  const { current, isLoading } = useSelector((state: RootState) => state.course);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState<string>('');
  const [editorHeight] = useState(125);
  const [search, setSearch] = useState('');
  const { id } = router.query;

  useEffect(() => {
    if (id && typeof id === 'string') {
      Promise.all([
        dispatch(course.info(id)),
        dispatch(course.groups(id)),
      ]);
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (current) {
      setTitle(current.name);
      setDescription(current.description);
    }
  }, [current]);

  const handleSave = () => {
    if (!current?.id) {return;}
    const updateData: TCreateCourse = {
      name: title,
      description,
    };
    dispatch(patchCourseThunk( { id: current.id, data: updateData }))
      .unwrap()
      .then((res) => {
        showSuccessMessage(
          typeof res.message === 'string' ? res.message : res.message.message,
        );
        setIsEditing(false);
      })
      .catch((err) => showErrorMessage(err.message));
  };

  return (
    <AppLayout>
      <Skeleton
        isLoaded={!isLoading}
        fadeDuration={4}
        minH={10}
        mb={3}
        ml={12}
        display="flex"
        justifyContent="flex-start"
        gap={4}
      >
        {isEditing ? (
          <Input
            size="lg"
            fontSize="3xl"
            fontWeight="bold"
            lineHeight="short"
            variant="unstyled"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Название курса"
          />
        ) : (
          <Heading size="lg">{title}</Heading>
        )}
        <Button
          variant={isEditing ? 'primary' : 'edit' }
          size={isEditing ? 'sm' : 'md' }
          onClick={isEditing ? handleSave : () => {
            setIsEditing(true);
            setIsExpanded(true);
          }
          }
        >
          {isEditing ? (
            <SaveIcon
              boxSize={6}
              mr={1}
            />
          ): <EditIcon boxSize={5} />}
          {isEditing ? 'Сохранить' : null}
        </Button>
      </Skeleton>

      <Box ml={12}>
        {isEditing ? (
          <Box
            position="fixed"
            top="1vh"
            zIndex="toast"
            width="max-content"
            left="50%"
            transform="translateX(-50%)"
          >
            <Alert
              status="info"
              variant="top-accent"
              borderRadius="md"
              boxShadow="md"
              py={3}
              bg={'sidebar.bg'}
              color={'sidebar.text'}
              borderColor={'primary.purple'}
            >
              <AlertIcon color={'primary.purple'}/>
            Вы находитесь в режиме редактирования. Не забудьте сохранить изменения
            </Alert>
          </Box>
        ) : null}
        <Skeleton
          isLoaded={!isLoading}
          fadeDuration={4}
          minH={20}
          mb={3}
        >
          <VStack
            align="start"
            spacing={4}
          >
            <Box
              position="relative"
              width="100%"
              height="100%"
              overflow="hidden"
              maxHeight={isExpanded ? 'none' : editorHeight}
            >
              {isEditing ? (
                <Editor
                  initialContent={description}
                  onChange={(val) => setDescription(val)}
                  editable
                />
              ) : (
                <Box>
                  <Editor
                    initialContent={description}
                    editable={false}
                  />
                </Box>
              )}
              {!isExpanded && !isEditing ? (
                <Box
                  position="absolute"
                  bottom="0"
                  left="0"
                  right="0"
                  height="50"
                  bgGradient="linear(to-t, background.fill , rgba(255,255,255,0))"
                  pointerEvents="none"
                />
              ) : null}
            </Box>
            <Button
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              disabled= {(isEditing)}
            >
              {isExpanded ? 'Свернуть' : 'Развернуть'}
            </Button>
          </VStack>
        </Skeleton>

        <Skeleton
          isLoaded={!isLoading}
          fadeDuration={4}
          minH={56}
          mb={3}
        >
          <HStack
            justify="space-between"
            width="100%"
            paddingBlock={4}
          >
            <SearchInput
              value={search || ''}
              placeholder="Поиск группы"
              // onChange={onChangeSearchInput}
              // onClearSearchInput={onClearSearchInput}
            />
            <WindowModal body={(onClose) => <AddNewGroupToCourse onClose={onClose}/>}/>
          </HStack>
          <TableCourseInfo search={search}/>
        </Skeleton>

      </Box>
    </AppLayout>
  );
};

export default CoursePage;
