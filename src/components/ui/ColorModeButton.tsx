import { Button, Container, useColorMode } from '@chakra-ui/react'
import { useTranslations } from 'next-intl'
import { BsSun, BsMoon } from 'react-icons/bs'

const buttonTheme = [
  {
    value: 'light',
    icon: <BsMoon />,
  },
  {
    value: 'dark',
    icon: <BsSun />,
  },
]

type Props = {
  isCollapse: boolean
}

const ColorModeButton = ({ isCollapse }: Props) => {
  const t = useTranslations()
  const { colorMode, setColorMode, toggleColorMode } = useColorMode()

  const onSearchUseButton = () => {
    return buttonTheme.find(btn => btn.value === colorMode) || buttonTheme[0]
  }

  return (
    <Container variant={'boxTheme'}>
      {isCollapse ? (
        <Button
          key={Math.random()}
          size={'xs'}
          variant={'switchTheme'}
          isActive={!!onSearchUseButton}
          onClick={toggleColorMode}
          leftIcon={onSearchUseButton().icon}
        >
          {/* {t(
            onSearchUseButton().value.charAt(0).toUpperCase() +
              onSearchUseButton().value.slice(1)
          )} */}
        </Button>
      ) : (
        buttonTheme.map(theme => (
          <Button
            key={Math.random()}
            size={'xs'}
            variant={'switchTheme'}
            isActive={colorMode === theme.value}
            onClick={() => setColorMode(theme.value)}
            leftIcon={theme.icon}
          >
            {t(theme.value.charAt(0).toUpperCase() + theme.value.slice(1))}
          </Button>
        ))
      )}
    </Container>
  )
}

export default ColorModeButton
