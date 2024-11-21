import { modalAnatomy as parts } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys)

const baseStyle = definePartsStyle({
  header: {
    borderBottom: '1px solid',
    borderColor: 'whiteAlpha.100',
    textTransform: 'uppercase',
    fontSize: 'lg'
  },
  dialog:{
    bg:'background.main',
  }
})

export const modalTheme = defineMultiStyleConfig({
  baseStyle,
})