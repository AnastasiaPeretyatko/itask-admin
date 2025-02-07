import {
  FormControl,
  FormLabel,
  Icon,
  List,
  ListIcon,
  ListItem,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Switch,
  useColorMode,
} from '@chakra-ui/react'
import { ReactNode } from 'react'
import { BsGear } from 'react-icons/bs'
// import { useRouter } from 'next/router'
import { MoonIcon } from '@chakra-ui/icons'

type Props = {
  children: ReactNode
}

const UserSettingPopover = ({ children }: Props) => {
  const { toggleColorMode, colorMode } = useColorMode()
  // const router = useRouter()

  // const onChangeLocale = (newLocale: string) => {
  //   router.push(router.pathname, router.asPath, { locale: newLocale })
  // }

  return (
    <Popover variant={'userSetting'} placement="top-end">
      <PopoverTrigger>{children}</PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverArrow bg={'background.main'} />
          <PopoverBody>
            <List variant={'settingPopover'}>
              <ListItem>
                <FormControl
                  width={'full'}
                  display="flex"
                  alignItems="center"
                  justifyContent={'space-between'}
                >
                  <FormLabel htmlFor="dark-alerts" mb="0" fontSize={'sm'}>
                    <Icon as={MoonIcon} mr={2} />
                    Dark mode
                  </FormLabel>
                  <Switch
                    id="dark-alerts"
                    size={'sm'}
                    onChange={toggleColorMode}
                    isChecked={colorMode === 'dark'}
                  />
                </FormControl>
              </ListItem>
              <ListItem>
                <ListIcon as={BsGear} />
                Settings
              </ListItem>
              {/* <ListItem>
                <SelectorLanguageInput
                  array={LANGUAGES}
                  currentValue={router.locale}
                  onChangeValue={onChangeLocale}
                />
              </ListItem> */}
            </List>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  )
}

export default UserSettingPopover
