import { extendTheme } from '@chakra-ui/react'
import { buttonTheme } from './components/button'
import { containerTheme } from './components/container'
import { headingTheme } from './components/heading'
import { inputTheme } from './components/input'
import { listTheme } from './components/list'
import { modalTheme } from './components/modal'
import { tableTheme } from './components/table'
// import { menuTheme } from './components/menu'
import { popoverTheme } from './components/popover'
import { colors } from './colors'
import { textareaTheme } from './components/textarea'

export const theme = extendTheme({
  config: {
    initialColorMode: 'system',
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
      background: {
        main: { _dark: '#1A1D1F', _light: 'white.100' },
        fill: { _dark: 'BLACK_300', _light: 'white.200' },
        switch: { _dark: 'BLACK_100', _light: 'white.300' },
        button: { _dark: 'whiteAlpha.200', _light: 'neutral.light' },
      },
      bg: { _dark: 'black', _light: 'white.300' },
      input: {
        outline: { _dark: 'whiteAlpha.200', _light: 'blackAlpha.300' },
      },
      selector: {
        bg: { _dark: '#2e3337', _light: 'white.100' },
      },
      notify: {
        bg: { _dark: 'primary.darkBlue', _light: 'white.100' },
      },
      text: {
        bold: { _dark: 'whiteAlpha.800', _light: 'blackAlpha.800' },
        pale: { _dark: 'whiteAlpha.600', _light: 'blackAlpha.600' },
      },
      button: {
        bg: { _dark: 'whiteAlpha.900', _light: 'blackAlpha.400' },
      },
    },
  },
  colors: {
    ...colors,
  },
  components: {
    Container: containerTheme,
    Button: buttonTheme,
    Heading: headingTheme,
    Input: inputTheme,
    List: listTheme,
    Modal: modalTheme,
    Table: tableTheme,
    // Menu: menuTheme,
    Popover: popoverTheme,
    Textarea: textareaTheme
  },
})
