import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const form_input = defineStyle({
  backgroundColor: 'background.main',
  borderRadius: 6,
  border: '1px solid',
  borderColor: 'input.outline',
  _focus: {
    border: '2px solid',
    borderColor: 'primary.purple',
  },
})

export const textareaTheme = defineStyleConfig({
  variants: { form_input },
})
