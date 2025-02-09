import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const baseStyle = defineStyle({});

const primary = defineStyle(() => {
  return {
    paddingX: 7,
    fontSize: 'sm',
    bg: 'primary.purple',
    color: 'white',
    borderRadius: 10,
    _disabled: {
      opacity: 0.7,
    },
    _hover: {
      opacity: 0.8,
      _disabled: {
        opacity: 0.7,
        bg: 'primary.purple',
      },
    },
  };
});

const secondary = defineStyle(() => {
  return {
    paddingX: 7,
    fontSize: 'sm',
    border: '2px solid',
    borderColor: 'primary.purple',
    borderRadius: 10,
    _hover: {
      opacity: 0.8,
      bg: 'primary.purple',
      color: 'white',
      _disabled: {
        opacity: 0.5,
        bg: 'button.bg',
        color: 'text.pale',
      },
    },
  };
});

const sidebar = defineStyle({
  display: 'flex',
  width: 'full',
  gap: 2,
  padding: 3,
  color: 'gray.500',
  textAlign: 'center',
  fontWeight: 400,
  fontSize: 'sm',
  borderRadius: 'md',
  '& span': {
    '& svg': {
      margin: 'unset',
    },
    marginInlineEnd: 'unset',
  },
  _hover: {
    bg: 'blackAlpha.800',
    color: 'white',
  },
  _active: {
    bg: 'blackAlpha.800',
    color: 'white',
  },
});

const unstyledBtn = defineStyle(() => {
  return {};
});

const pagination = defineStyle(() => {
  return {
    color: 'text.pale',
    _active: {
      bg: 'primary.purple',
      color: 'background.main',
    },
  };
});

const openSidebar = defineStyle({
  minW: 'unset',
  width: 26,
  height: 26,
  borderRadius: 'full',
  padding: 1,
  fontSize: 'lg',
  position: 'absolute',
  zIndex: 1,
  right: -13,
  top: 23,
  backgroundColor: 'background.switch',
  boxShadow: 'lg',
  _hover: {
    backgroundColor: 'blackAlpha.800',
  },
});

const link = defineStyle({
  border: 'none',
  padding: 'unset',
  margin: 'unset',
  color: 'inherit',
  fontWeight: 400,
  fontSize: 'sm',
  _hover: {
    textDecoration: 'none',
    color: 'primary.purple',
  }
})

export const buttonTheme = defineStyleConfig({
  baseStyle,
  variants: {
    primary,
    secondary,
    sidebar,
    unstyledBtn,
    pagination,
    openSidebar,
    link
  },
});
