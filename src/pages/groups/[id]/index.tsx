import { AddIcon } from '@chakra-ui/icons';
import { Heading, HStack, IconButton, Tag } from '@chakra-ui/react';
import axios from 'axios';
import { GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '@/components/Layout/AppLayout';
import WindowModal from '@/components/modal/WindowModal';
import SearchInput from '@/components/ui/SearchInput';
import CreateStudent from '@/features/students/components/CreateStudent';
import ViewTableStudents from '@/features/students/components/ViewTableStudents';
import { getGroupOneThunk } from '@/store/groups/groups.thunks';
import { AppDispatch, RootState } from '@/store/store';
import { getStudentsByGroupThunk } from '@/store/students/students.thunks';

export async function getStaticPaths() {
  try {
    const { data: groups } = await axios.get(
      'http://localhost:5000/groups/groups.id',
    );

    if (!Array.isArray(groups) || !groups.every((g) => g.id)) {
      return { paths: [], fallback: false };
    }

    const paths = groups
      .map((group: { id: number }) => [
        { params: { id: group.id.toString() }, locale: 'ru' },
        { params: { id: group.id.toString() }, locale: 'en' },
      ])
      .flat();

    return {
      paths,
      fallback: false,
    };
  } catch (error) {
    console.error('Ошибка при выполнении getStaticPaths:', error);
    return { paths: [], fallback: false };
  }
}

export async function getStaticProps({
  locale,
  params,
}: GetStaticPropsContext) {
  const { id } = params!;
  if (!id) {
    console.error('ID не найден в параметрах');
    return { notFound: true };
  }

  const url = `http://localhost:5000/groups/${id}?lang=${locale}`;

  try {
    const { data: group } = await axios.get(url);

    if (!group || !group.id) {
      console.error('Данные о группе отсутствуют или некорректны:', group);
      return { notFound: true };
    }

    return {
      props: {
        group,
        messages: (await import(`../../../../messages/${locale}.json`)).default,
      },
    };
  } catch (error) {
    console.error('Ошибка в getStaticProps:', error);
    return { notFound: true };
  }
}

const PageGroup = () => {
  const t = useTranslations();
  const dispatch = useDispatch<AppDispatch>();
  const { query } = useRouter();
  const { data } = useSelector((state: RootState) => state.currentGroup);

  useEffect(() => {
    if (query && query.id && typeof query.id === 'string') {
      dispatch(getGroupOneThunk(query.id));
      dispatch(getStudentsByGroupThunk(query.id));
    }
  }, [query, dispatch]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <AppLayout>
      {/* <BreadcrumbUI options={[`${data?.groupCode}`]} /> */}
      <HStack mb={2}>
        <Heading
          size={'xl'}
          mb={1}
        >
          {data?.groupCode}
        </Heading>
        {data.degree ? <Tag colorScheme="blue">{t(data.degree)}</Tag> : null}
        {data.educationMode ? (
          <Tag colorScheme="green">{t(data.educationMode)}</Tag>
        ) : null}
      </HStack>
      <HStack
        justifyContent={'space-between'}
        mb={4}
      >
        <SearchInput
          onChange={() => {}}
          value={''}
          isDisabled
        />
        <WindowModal
          action={<IconButton
            aria-label="add"
            icon={<AddIcon />}
          />}
          body={(onClose) => (<CreateStudent
            onClose={onClose}
            group={data}
          />)}
        />
      </HStack>
      <ViewTableStudents />
    </AppLayout>
  );
};

export default PageGroup;
