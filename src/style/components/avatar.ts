import { avatarAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(avatarAnatomy.keys);

const baseStyle = definePartsStyle({
  container: {
    fontSize: 'inherit',
    fontWeight: 'inherit',
    'div[role=img]': {
      fontSize: 'inherit',
    },
  },
});

export const avatarTheme = defineMultiStyleConfig({ baseStyle });