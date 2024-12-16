import { tableAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(tableAnatomy.keys)

const baseStyle = definePartsStyle({
  table: {
    thead: {
      bg: '#1a40cf1c',
      th: {
        paddingY: 3
      }
    },
    tbody: {
      tr: {
        cursor: 'pointer',
        _hover: {
          bg: 'background.button'
        },
        td: {
          border: '1px solid',
          borderColor: 'blackAlpha.200',
        }
      }
    }
  }
})



export const tableTheme = defineMultiStyleConfig({ baseStyle })