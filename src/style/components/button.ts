import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const baseStyle = defineStyle({})

const switchTheme = defineStyle(() => {
  return {
    textTransform: 'capitalize',
    display: 'flex',
    maxW: 'unset',
    width: '100%',
    _active: {
      bg: 'fill.switch',
      // color: 'white',
      borderRadius: 'md',
    },
  }
})

const primary = defineStyle(() => {
  return {
    paddingX: 7,
    fontSize: 'sm',
    bg: 'PRIMARY_PURPLE',
    color: 'white',
    // textTransform: 'capitalize',
    borderRadius: 10,

    _hover: {
      bgColor: 'purple.600',
      _disabled: {
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

const sidebarBtn = defineStyle(() => {
  return {
    borderRadius: 'none',
    paddingY: 1,
    paddingX: 2,
    justifyContent: 'start',
    width: '100%',
    fontWeight: 400,
    fontSize: 'sm',
    // _hover: {
    //   bg: 'fill.switch',
    // },
    _hover: {
      borderRight: '4px solid',
      borderColor: 'SECONDARY_PURPLE',
    },
    _active: {
      borderRight: '4px solid',
      borderColor: 'SECONDARY_PURPLE',
      color: 'PRIMARY_PURPLE',
    },
  }
})

const iconStyle = defineStyle(() => {
  return {

  }
})

export const buttonTheme = defineStyleConfig({
  baseStyle,
  variants: { switchTheme, primary, sidebarBtn, iconStyle },
  defaultProps: {
    // size: 'sm',
  },
})
