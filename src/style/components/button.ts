import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const baseStyle = defineStyle({});

const primary = defineStyle(() => {
  return {
    paddingX: 7,
    fontSize: 'sm',
    bg: 'primary.purple',
    color: 'white.primary',
    borderRadius: 5,
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
    borderRadius: 5,
    _hover: {
      opacity: 0.8,
      bg: 'primary.purple',
      color: 'white.primary',
      _disabled: {
        opacity: 0.5,
        bg: 'button.bg',
        color: 'text.secondary',
      },
    },
  };
});

const sidebar = defineStyle({
  padding: 3,
  width: 'full',
  display: 'flex',
  textAlign: 'center',
  gap: 2,
  borderRadius: 'md',
  fontSize: 'sm',
  fontWeight: '500',
  '& span': {
    margin: 'unset',
    '& svg': {
      width: 5,
      height: 5,
    },
  },
  _hover: {
    background: 'sidebar.hoverButton',
    color: 'sidebar.hoverText',
  },
  _active: {
    background: 'sidebar.hoverButton',
    color: 'sidebar.hoverText',
  },
});

const unstyledBtn = defineStyle(() => {
  return {
    display: 'inline-flex',
    alignItems: 'center',
  };
});

const pagination = defineStyle(() => {
  return {
    color: 'text.secondary',
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
  backgroundColor: 'background.main',
  boxShadow: 'base',
  _hover: {
    background: 'sidebar.hoverButton',
    color: 'sidebar.hoverText',
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
  },
});

export const buttonTheme = defineStyleConfig({
  baseStyle,
  variants: {
    primary,
    secondary,
    sidebar,
    unstyledBtn,
    pagination,
    openSidebar,
    link,
  },
});
