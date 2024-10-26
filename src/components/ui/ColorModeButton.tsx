import { Box, Button, Container, useColorMode } from '@chakra-ui/react'
import { useTranslations } from 'next-intl'
import { BsSun, BsMoon } from 'react-icons/bs'
import React from 'react'

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

const ColorModeButton = () => {
  const t = useTranslations()
  const { colorMode, setColorMode } = useColorMode()
  return (
    <Container variant={'boxTheme'}>
      {buttonTheme.map(theme => (
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
      ))}
    </Container>
  )
}

export default ColorModeButton
