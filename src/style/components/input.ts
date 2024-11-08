import { inputAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys)

const form_input = definePartsStyle({
  field: {
    backgroundColor: 'bg',
    borderRadius: '10px',
    border: '1px solid',
    borderColor: 'fill.switch',
    _focusVisible: {
      border: 'inherit',
    },
  },
})

const search = definePartsStyle({
  field: {
    paddingX: 4,
    borderRadius: 10,
    border: '1px solid',
    borderColor: 'text.pale',
    fontSize: 'sm',
    _placeholder: {
      fontSize: 'sm',
      color: 'text.pale',
    },
    _focus: {
      border: '2px solid',
      borderColor: 'PRIMARY_PURPLE',
    },
  },
})

export const inputTheme = defineMultiStyleConfig({
  variants: { form_input, search },
})
