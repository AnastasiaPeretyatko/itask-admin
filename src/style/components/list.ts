import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'
import { listAnatomy as parts } from '@chakra-ui/anatomy'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys)

const selectList = definePartsStyle(() => ({
  container: {
    width: '100%',
    position: 'absolute',
    top: '100%',
    bg: 'selector.bg',
    marginTop: 2,
    borderRadius: '5px',
    padding: 2,
    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 18px 50px -10px',
    zIndex: 10,
  },
  item: {
    padding: 2,
    fontSize: 'sm',
    _hover: {
      cursor: 'pointer',
      bg: 'background.main',
      borderRadius: '5px',
    },
  },
}))

const settingPopover = definePartsStyle(() => ({
  item: {
    padding: 2,
    cursor: 'pointer',
    borderRadius: 6,
    _hover: {
      bg: 'background.switch',
    },
  },
}))

export const listTheme = defineMultiStyleConfig({
  variants: { selectList, settingPopover },
})
