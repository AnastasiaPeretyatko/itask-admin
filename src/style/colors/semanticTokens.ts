export const semanticTokens = {
  colors: {
    font: { _dark: 'whiteAlpha.900', _light: 'blackAlpha.800' },
    background: {
      fill: { _dark: '#1A1D1F', _light: 'white.100' },
      // main: { _dark: 'black.300', _light: 'white.300' },
      switch: { _dark: 'black.100', _light: 'white.300' },
      button: { _dark: 'whiteAlpha.200', _light: 'neutral.light' },
      natural: { _dark: 'black.100', _light: '#e2e3e72e' },

      //? new
      main: { _dark: 'almostBlack', _light: 'white.primary' },
      20: { _dark: 'almostBlack20', _light: 'white.20' },
      secondary: { _dark: 'black.50', _light: 'warmGrey' },

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



    link: { _light: 'primary.blue', _dark: 'primary.darkBlue' },
    text: {
      primary: { _light: 'almostBlack', _dark: 'almostWhite' },
      lighter: { _light: '#808aa9', _dark: '#fff' },
      secondary: { _light: 'slate.dark', _dark: '#b8c0c8' },
      tertiary: { _light: 'slate.primary', _dark: 'slate.primary' },
    },
    placeholder: { _light: '#a2b2c3', _dark: 'slate.dark' },
    sidebar: {
      bg: { _light: 'warmGrey', _dark: 'veryDarkBlue' },
      text: { _light: 'rgb(78, 92, 110)', _dark: 'slate' },
      hoverButton: { _dark: 'white.50', _light: 'almostBlack' },
      hoverText: { _light: 'white.75', _dark: 'rgb(78, 92, 110)' },
    },
    shadow: { _light: 'rgba(0, 0, 0, 0.2)', _dark: 'rgba(0, 0, 0, 0.6)' },
    modal: {
      backdrop: { _light: 'black.10', _dark: 'black.50' },
      bg: { _light: 'white.primary', _dark: '#1f2128' },
    },
    divider: { _light: 'slate.light', _dark: '#262a37' },
    button: {
      neuteal: {
        bg:{ _light: 'white.primary', _dark: 'almostBlack' },
        bgDarker05: { _light: '#f2f2f2', _dark: '#07070a' },
        text: { _light: 'almostBlack', _dark: 'white.primary' },
        border: { _light: '#d9d9d9', _dark: 'slate.dark' },
      },
    },
    tooltip: {
      bg: { _light: 'almostBlack', _dark: 'white.primary' },
      text: { _light: 'white.primary', _dark: 'lightBlack' },
    },
    toast: {
      bg: { _light: 'almostBlack', _dark: 'white.primary' },
      text: { _light: 'white.primary', _dark: 'lightBlack' },
    },
  },
};