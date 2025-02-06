import { tableAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(tableAnatomy.keys);

const baseStyle = definePartsStyle({
  table: {
    thead: {
      bg: 'background.main',
      th: {
        paddingY: 3,
        textTransform: 'capitalize',
        fontSize: 'sm',
        fontWeight: 'normal',
        _first: {
          width: '48px', // for checkbox
        },
        _last: {
          width: '48px', // for checkbox
        },
      },
    },
    tbody: {
      tr: {
        cursor: 'pointer',
        _hover: {
          bg: 'background.natural',
        },
        td: {
          paddingY: 3,
        },
      },
    },
  },
});



export const tableTheme = defineMultiStyleConfig({ baseStyle });