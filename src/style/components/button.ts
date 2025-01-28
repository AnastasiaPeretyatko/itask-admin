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

const sidebar = defineStyle({
  display: 'flex',
  width: 'full',
  gap: 2,
  padding: 3,
  color: 'gray.500',
  fontWeight: 400,
  fontSize: 'sm',
  borderRadius: 'md',
  '& span': {
    '& svg': {
      margin: 'unset',
    },
    marginInlineEnd: 'unset',
  },
  _hover: {
    bg: 'blackAlpha.800',
    color: 'white',
  },
  _active: {
    bg: 'blackAlpha.800',
    color: 'white',
  },
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
    sidebar,
    unstyledBtn,
    pagination,
  },
  defaultProps: {
    // size: 'sm',
  },
})
