import { MoonIcon } from '@chakra-ui/icons'
import {
  Button,
  FormControl,
  FormLabel,
  Icon,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverTrigger,
  Portal,
  Switch,
  useColorMode,
} from '@chakra-ui/react'
import { ReactNode } from 'react'
import { BsGear, BsIndent } from 'react-icons/bs'
import SelectorInput from '../ui/SelectorInput'
import { LANGUAGES } from '@/common/assets/language'
import { useRouter } from 'next/router'

type Props = {
  children: ReactNode
}

const UserSettingPopover = ({ children }: Props) => {
  const { toggleColorMode, colorMode } = useColorMode()
  const router = useRouter()

  const onChangeLocale = (newLocale: string) => {
    router.push(router.pathname, router.asPath, { locale: newLocale })
  }

  return (
    <Popover variant={'userSetting'} placement="top-end">
      <PopoverTrigger>{children}</PopoverTrigger>
      <Portal>
        <PopoverContent>
          {/* Нужно решить проблему почему через вариант нельзя изменить фон */}
          <PopoverArrow bg={'background.main'} />
          <PopoverBody>
            <Button variant={'unstyledBtn'} leftIcon={<BsGear />}>
              Settings
            </Button>
            <FormControl
              width={'full'}
              display="flex"
              alignItems="center"
              justifyContent={'space-between'}
              paddingY={1}
              paddingX={2}
              mb={4}
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
            <SelectorInput
              array={LANGUAGES}
              currentValue={router.locale}
              onChangeValue={onChangeLocale}
            />
          </PopoverBody>
          <PopoverFooter>
            <Button leftIcon={<BsIndent />} variant={'unstyledBtn'}>
              Sign out
            </Button>
          </PopoverFooter>
        </PopoverContent>
      </Portal>
    </Popover>
  )
}

export default UserSettingPopover
