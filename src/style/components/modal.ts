import { modalAnatomy as parts } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys)

const baseStyle = definePartsStyle({
  header: {
    display: 'flex',
    gap: 4,
    padding: 6,
  },
  dialog: {
    bg: 'background.main',
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  footer: {
    gap: 4,
    padding: 6,
  }
})

export const modalTheme = defineMultiStyleConfig({
  baseStyle,
})
