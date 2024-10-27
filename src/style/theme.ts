import { extendTheme } from '@chakra-ui/react'
import { buttonTheme } from './components/button'
import { containerTheme } from './components/container'
import { headingTheme } from './components/heading'
import { inputTheme } from './components/input'
import { listTheme } from './components/list'
import { modalTheme } from './components/modal'

export const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: true,
  },
  styles: {
    global: {
      body: {
        bg: 'bg',
      },
    },
  },
  semanticTokens: {
    colors: {
      text: {
        pale: { _dark: 'whiteAlpha.600', _light: 'blackAlpha.600' },
      },
      bg: { _dark: 'BLACK_100', _light: 'white' },
      fill: {
        switch: { _dark: 'whiteAlpha.50', _light: 'blackAlpha.100' },
      },
      background: {
        switch: { _dark: 'whiteAlpha.50', _light: 'blackAlpha.100' },
      },
    },
  },
  colors: {
    PRIMARY_BLUE: '#2A85FF',
    PRIMARY_GREEN: '#83BF6E',
    PRIMARY_ORANGE: '#FF6A55',
    PRIMARY_PURPLE: '#8E59FF',

    SECONDARY_BLUE: '#B1E5FC',
    SECONDARY_GREEN: '#B5E4CA',
    SECONDARY_ORANGE: '#FFBC99',
    SECONDARY_PURPLE: '#CABDFF',

    BLACK_100: '#111315',
    BLACK_200: '#1A1D1F',
    BLACK_300: '#272B30',
    BLACK_400: '#303336',
  },
  components: {
    Container: containerTheme,
    Button: buttonTheme,
    Heading: headingTheme,
    Input: inputTheme,
    List: listTheme,
    Modal: modalTheme
  },
})
