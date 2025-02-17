import { modalAnatomy as parts } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({
  header: {
    display: 'flex',
    gap: 4,
    padding: 'unset',
  },
  dialog: {
    bg: 'background.main',
    padding: 6,
    gap: 4,
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
    // paddingInline: 0,
    // padding: 0,
  },
  footer: {
    gap: 4,
  },
});

export const modalTheme = defineMultiStyleConfig({
  baseStyle,
});
