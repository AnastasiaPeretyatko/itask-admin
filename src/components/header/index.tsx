import { Avatar, HStack } from '@chakra-ui/react'
import SearchInput, { SearchInputProps } from '../ui/SearchInput'
import SelectorInput from '../ui/SelectorInput'
import { useRouter } from 'next/router'
import { LANGUAGES } from '@/common/assets/language'

type Props = {} & SearchInputProps

const Header = ({ ...props }: Props) => {
  const router = useRouter()

  const onChangeLocale = (newLocale: string) => {
    router.push(router.pathname, router.asPath, { locale: newLocale })
  }

  return (
    <HStack
      width={'100%'}
      paddingY={3}
      paddingX={6}
      bg={'sidebarBG'}
      justify={'space-between'}
      mb={6}
    >
      <SearchInput {...props} />
      <SelectorInput
        size={48}
        array={LANGUAGES}
        currentValue={router.locale}
        onChangeValue={onChangeLocale}
      />
      <Avatar size={'md'} name="Ivan Petrov" />
    </HStack>
  )
}

export default Header
