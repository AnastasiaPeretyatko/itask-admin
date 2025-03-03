import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import {
  Container,
  Heading,
  IconButton,
  VStack,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ColorModeBtn from '../ui/ColorModeBtn';
import SidebarItem from './components/SidebarItem';
import { sidebarConfig, sidebarMenuConfig } from './config';
import { AppDispatch, RootState } from '@/store/store';
import { changeStateSidebar } from '@/store/user-setting/setting.slice';

const Sidebar = () => {

  const { isOpenSidebar } = useSelector(
    (state: RootState) => state.userSettings,
  );
  const dispatch = useDispatch<AppDispatch>();

  const setCollapse = () => dispatch(changeStateSidebar(!isOpenSidebar));


  useEffect(() => {
    // const kek = localStorage.getItem('sidebar');
    // if (isOpenSidebar === null) {
    //   dispatch(changeStateSidebar(Boolean(kek) || true))
    // }
  }, [dispatch, isOpenSidebar]);

  return (
    <Container
      variant="sidebar"
      maxW={isOpenSidebar ? 250 : 20}
      transition=" max-width ease-in-out .2s"
    >
      <IconButton
        variant="openSidebar"
        aria-label="open-sidebar"
        icon={!isOpenSidebar ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        onClick={setCollapse}
      />
      {isOpenSidebar ? (
        <Container
          py={4}
          mb={6}
          width={'100%'}
          display={'flex'}
          flexDirection={'column'}
          gap={4}
          borderColor={'input.outline'}
          paddingInline={0}
        >
          <Heading
            size={'md'}
            whiteSpace={'nowrap'}
          >ITASK | Admin</Heading>
        </Container>
      ) : null}

      <VStack
        height="100%"
        justify="space-between"
        align={isOpenSidebar ? 'center' : 'start'}
        width={'100%'}
        position={'relative'}
        mt={!isOpenSidebar ? 28 : 0}
      >
        <VStack
          width={'100%'}
          align={isOpenSidebar ? 'start' : 'center'}
        >
          {sidebarConfig.map((el) => {
            return (
              <SidebarItem
                key={el.title}
                data={el}
                isCollapse={isOpenSidebar}
              />
            );
          })}
        </VStack>
      </VStack>
      <VStack
        width={'100%'}
        align={isOpenSidebar ? 'start' : 'center'}
      >
        <ColorModeBtn isOpenSidebar = {isOpenSidebar}/>

        {sidebarMenuConfig.map((el) => {
          return (
            <SidebarItem
              key={el.title}
              data={el}
              isCollapse={isOpenSidebar}
            />
          );
        })}
      </VStack>
    </Container>
  );
};

export default Sidebar;
