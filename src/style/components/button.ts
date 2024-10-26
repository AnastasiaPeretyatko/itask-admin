import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const baseStyle = defineStyle({
})

const switchTheme = defineStyle(() => {
  return {
    textTransform: 'capitalize',
    display: 'flex',
    maxW: 'unset',
    width: '100%',
    _active: {
      bg: 'PRIMARY_BLUE',
      color: 'white',
      borderRadius: 'md',
    },
  }
})

const primary = defineStyle(() => {
  return {
    bg: 'PRIMARY_BLUE',
    color: 'white',
    _hover: {
      opacity: 0.8,
    },
    _active: {
      bg: 'SECONDARY_BLUE',
    },
    _disabled: {
      bg: 'BLACK_400',
    },
  }
})

const sidebarBtn = defineStyle(() => {
  return {
    borderRadius: 'md',
    padding: 1,
    justifyContent: 'start',
    width: '100%',
    _hover: {
      bg: 'fill.switch'
    }
  }
})

export const buttonTheme = defineStyleConfig({
  baseStyle,
  variants: { switchTheme, primary, sidebarBtn },
  defaultProps: {
    size: 'sm',
  },
})
