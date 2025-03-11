import { inputAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys);

const form_input = definePartsStyle({
  field: {
    backgroundColor: 'background.main',
    borderRadius: 6,
    border: '1px solid',
    borderColor: 'input.outline',
    _focus: {
      border: '2px solid',
      borderColor: 'primary.purple',
    },
  },
});

const search = definePartsStyle({
  field: {
    paddingX: 4,
    borderRadius: 0,
    backgroundColor: 'unset',
    fontSize: 'sm',
    _placeholder: {
      fontSize: 'md',
      color: 'text.secondary',
    },
    _focus: {
      borderBottom: '1px solid',
      // какой нибудь акцентный цвет для бордера снизу
    },
  },
});

const unstyled = definePartsStyle({
  field: {
    backgroundColor: 'inherit',
  },
});

export const inputTheme = defineMultiStyleConfig({
  variants: { form_input, search, unstyled },
});
