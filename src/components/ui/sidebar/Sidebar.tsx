import { Button, Container, IconButton, VStack } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store/store'
import { changeStateSidebar } from '@/store/user-setting/setting.slice'
import { CloseIcon } from '@chakra-ui/icons'
import { LogoutIcon, MenuIcon } from '@/components/customIcon'
import { sidebarConfig } from './config'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Sidebar = () => {
  const router = useRouter()
  const { isOpenSidebar } = useSelector(
    (state: RootState) => state.userSettings
  )
  const dispatch = useDispatch<AppDispatch>()

  const setCollapse = () => {
    dispatch(changeStateSidebar(!isOpenSidebar))
  }

  useEffect(() => {
    if (isOpenSidebar === null) {
      dispatch(changeStateSidebar(!!localStorage.getItem('sidebar') || true))
    }
  }, [dispatch, isOpenSidebar])

  return (
    <Container
      variant="sidebar"
      boxShadow={'base'}
      maxW={isOpenSidebar ? 250 : 20}
      transition="ease-in-out .2s"
    >
      <IconButton
        aria-label="menu"
        variant="unstyled"
        textAlign={isOpenSidebar ? 'end' : 'center'}
        icon={isOpenSidebar ? <CloseIcon /> : <MenuIcon />}
        fontSize={'xs'}
        onClick={setCollapse}
      />

      <VStack
        height="100%"
        justify="space-between"
        align={isOpenSidebar ? 'center' : 'start'}
        width={'100%'}
      >
        <VStack width={'100%'} align={isOpenSidebar ? 'start' : 'center'}>
          {sidebarConfig.map(el => {
            return (
              <Button
                key={el.title}
                variant="sidebar"
                textAlign={'center'}
                justifyContent={!isOpenSidebar ? 'center' : 'start'}
                leftIcon={el.icon}
                onClick={() => router.push(el.path)}
                isActive={router.pathname === el.path}
              >
                {isOpenSidebar && el.title}
              </Button>
            )
          })}
        </VStack>
      </VStack>
      <Button
        variant="sidebar"
        textAlign={'center'}
        justifyContent={!isOpenSidebar ? 'center' : 'start'}
        leftIcon={<LogoutIcon bgSize={3} />}
        // onClick={handleClickLogOut}
      >
        {isOpenSidebar && 'Выйти'}
      </Button>
    </Container>
  )
}

export default Sidebar
