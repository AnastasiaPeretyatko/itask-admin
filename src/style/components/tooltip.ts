import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const baseStyle = {
  borderRadius: 'md',
};

const sidebarTooltip = defineStyle({
  background: 'tooltip.bg',
  color: 'tooltip.text',
  paddingX: 2,
  paddingY: 1,
  ml: 5,
});

export const tooltipTheme = defineStyleConfig({
  baseStyle,
  variants: {
    sidebarTooltip,
  },
});