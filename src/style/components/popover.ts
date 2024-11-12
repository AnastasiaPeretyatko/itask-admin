import { popoverAnatomy as parts } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys)

const baseStyle = definePartsStyle({
  arrow: 'inherit'
})

const userSetting = definePartsStyle({
  popper: {
    fontSize: 'sm',
  },
  content: {
    bg: 'background.main',
    width: 60,
    borderRadius: '10px',
  },
  body: {
    padding: 1,
  },
  footer: {
    padding: 1,
  },
  arrow: {
    background: 'background.main',
  }
})

export const popoverTheme = defineMultiStyleConfig({
  baseStyle,
  variants: { userSetting },
})
