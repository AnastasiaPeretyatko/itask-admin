import { tableAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(tableAnatomy.keys)

const baseStyle = definePartsStyle({
  table: {
    thead: {
      bg: 'whiteAlpha.100',
      th: {
        paddingY: 3
      }
    }
  }
})



export const tableTheme = defineMultiStyleConfig({ baseStyle })