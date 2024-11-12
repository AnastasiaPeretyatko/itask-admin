import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const logo = defineStyle({
  fontSize: 'xl',
  textTransform: 'uppercase',
  _first:{
    paddingRight: 2,
    borderRight: '2px solid',
    borderColor: 'blackAlpha.700',
    _dark: {
      borderColor: 'whiteAlpha.700'
    }
  }
})

export const headingTheme = defineStyleConfig({
  variants: { logo },
})
