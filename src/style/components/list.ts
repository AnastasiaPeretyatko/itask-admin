import {
  createMultiStyleConfigHelpers
} from '@chakra-ui/styled-system'
import { listAnatomy as parts } from '@chakra-ui/anatomy'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys)

const selectList = definePartsStyle(() => ({
  container: {
    width: '100%',
    position: 'absolute',
    top: '100%',
    bg: 'bg', 
    marginTop: 2,
    borderRadius: '5px',
    paddingY: 2,
    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 18px 50px -10px',
  },
  item: {
    padding: 2,
    fontSize: 'sm',
    _hover: {
      cursor: 'pointer',
      bg: '#cabdff3b'
    }
  }
}))

export const listTheme = defineMultiStyleConfig({ variants: {selectList} })