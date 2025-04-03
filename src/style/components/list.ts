import { listAnatomy as parts } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const selectList = definePartsStyle(() => ({
  container: {
    width: '100%',
    position: 'absolute',
    top: '100%',
    left: 0,
    bg: 'background.main',
    marginTop: 2,
    borderRadius: '5px',
    padding: 2,
    boxShadow: 'black.20 0px 18px 50px -10px',
    zIndex: 10,
    overflowX: 'hidden',

  },
  item: {
    padding: 2,
    fontSize: 'sm',
    widthL: '100%',
    whiteSpace: 'nowrap',
    _hover: {
      cursor: 'pointer',
      bg: 'background.secondary',
      borderRadius: '5px',
    },
  },
}));

const settingPopover = definePartsStyle(() => ({
  item: {
    padding: 2,
    cursor: 'pointer',
    borderRadius: 6,
    _hover: {
      bg: 'background.switch',
    },
  },
}));

export const listTheme = defineMultiStyleConfig({
  variants: { selectList, settingPopover },
});
