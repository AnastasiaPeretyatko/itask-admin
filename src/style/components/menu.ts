import { menuAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(menuAnatomy.keys)

const baseStyle = definePartsStyle({
  list: {
    padding: 2,
  },
  item: {
    display: 'flex',
    gap: 2,
    borderRadius: '5px',
    padding: 2,
    _hover: {
      bg: 'background.switch',
    },
    _active: {
      bg: 'transparent',
    },
    _focus: {
      bg: 'transparent',
    },
  },
})
// export the base styles in the component theme
export const menuTheme = defineMultiStyleConfig({ baseStyle })
