import { extendTheme } from '@chakra-ui/react'
import { buttonTheme } from './components/button'
import { containerTheme } from './components/container'
import { headingTheme } from './components/heading'
import { inputTheme } from './components/input'
import { listTheme } from './components/list'
import { modalTheme } from './components/modal'
import { tableTheme } from './components/table'
import { menuTheme } from './components/menu'

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
      sidebarBG: { _dark: '#1A1D1F', _light: 'white.100' },
      text: {
        pale: { _dark: 'whiteAlpha.600', _light: 'blackAlpha.600' },
      },
      bg: { _dark: 'black', _light: 'white.300' },
      fill: {
        switch: { _dark: 'BLACK_300', _light: 'white.200' },
      },
      background: {
        switch: { _dark: 'BLACK_100', _light: 'white.300' },
      },
      button: {
        bg: { _dark: 'whiteAlpha.900', _light: 'blackAlpha.400' },
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

    white: {
      100: 'white',
      200: '#FCFCFC',
      300: '#F4F4F4',
    },

    red: {
      100: '#FFECEE'
    },

    black: '#111315',
    PRIMARY_WHITE: '#FCFCFC',
  },
  components: {
    Container: containerTheme,
    Button: buttonTheme,
    Heading: headingTheme,
    Input: inputTheme,
    List: listTheme,
    Modal: modalTheme,
    Table: tableTheme,
    Menu: menuTheme,
  },
})
