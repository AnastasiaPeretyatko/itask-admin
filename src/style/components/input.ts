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
      border: 'inherit'
    }
  }
})

export const inputTheme = defineMultiStyleConfig({ variants: {form_input} })