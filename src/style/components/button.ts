import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const baseStyle = defineStyle({})

const primary = defineStyle(() => {
  return {
    paddingX: 7,
    fontSize: 'sm',
    bg: 'primary.purple',
    color: 'white',
    borderRadius: 10,
    _hover: {
      opacity: 0.8,
      _disabled: {
        opacity: 0.5,
        bg: 'button.bg',
        color: 'text.pale',
      },
    },
    _disabled: {
      bg: 'button.bg',
      color: 'text.pale',
    },
  }
})

const secondary = defineStyle(() => {
  return {
    paddingX: 7,
    fontSize: 'sm',
    border: '2px solid',
    borderColor: 'primary.purple',
    borderRadius: 10,
    _hover: {
      opacity: 0.8,
      bg: 'primary.purple',
      color: 'white',
      _disabled: {
        opacity: 0.5,
        bg: 'button.bg',
        color: 'text.pale',
      },
    },
  }
})

const sidebarBtn = defineStyle(() => {
  return {
    width: '100%',
    fontSize: 'sm',
    fontWeight: 500,
    padding: 2,
    gap: 4,
    _hover: {
      bg: 'background.button',
    },
    _active: {
      bg: 'background.button',
    },
    '& span': {
      mr: 0,
    },
  }
})

const unstyledBtn = defineStyle(() => {
  return {}
})

const pagination = defineStyle(() => {
  return {
    color: 'text.pale',
    _active: {
      bg: 'primary.purple',
      color: 'background.main',
    },
  }
})

export const buttonTheme = defineStyleConfig({
  baseStyle,
  variants: {
    primary,
    secondary,
    sidebarBtn,
    unstyledBtn,
    pagination,
  },
  defaultProps: {
    // size: 'sm',
  },
})
