import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const logo = defineStyle({
  fontSize: 'xl',
  textTransform: 'uppercase',
  _first:{
    paddingRight: 2,
    borderRight: '2px solid',
    borderColor: 'black.64',
    _dark: {
      borderColor: 'black.64',
    },
  },
});

export const headingTheme = defineStyleConfig({
  variants: { logo },
});
