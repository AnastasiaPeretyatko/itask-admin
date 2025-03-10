export const semanticTokens = {
  colors: {
    font: { _dark: 'whiteAlpha.900', _light: 'blackAlpha.800' },
    background: {
      fill: { _dark: 'onyx.gray', _light: 'white.100' },
      // main: { _dark: 'black.300', _light: 'white.300' },
      switch: { _dark: 'black.100', _light: 'white.300' },
      button: { _dark: 'whiteAlpha.200', _light: 'neutral.light' },
      natural: { _dark: 'black.100', _light: 'whisperGray' },
      auth: { _dark: 'onyx.midnight', _light: 'whisperGray' },

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
      bg: { _dark: 'darkCyanBlue', _light: 'white.100' },
    },
    notify: {
      bg: { _dark: 'primary.darkBlue', _light: 'white.100' },
    },



    link: { _light: 'primary.blue', _dark: 'primary.darkBlue' },
    text: {
      primary: { _light: 'almostBlack', _dark: 'almostWhite' },
      lighter: { _light: 'slate.lightGray', _dark: 'white' },
      secondary: { _light: 'slate.dark', _dark: 'spindle.gray' },
      tertiary: { _light: 'slate.primary', _dark: 'slate.primary' },
    },
    placeholder: { _light: 'spindle.blue', _dark: 'slate.dark' },
    sidebar: {
      bg: { _light: 'warmGrey', _dark: 'veryDarkBlue' },
      text: { _light: 'spindle.dark', _dark: 'slate.light' },
      hoverButton: { _dark: 'slate.light', _light: 'almostBlack' },
      hoverText: { _light: 'slate.light', _dark: 'almostBlack' },
    },
    shadow: { _light: 'black.20', _dark: 'black.60' },
    modal: {
      backdrop: { _light: 'black.10', _dark: 'black.50' },
      bg: { _light: 'white.primary', _dark: 'onyx.light' },
    },
    divider: { _light: 'slate.light', _dark: 'onyx.blue' },
    button: {
      neuteal: {
        bg:{ _light: 'white.primary', _dark: 'almostBlack' },
        bgDarker05: { _light: 'warmGrey', _dark: 'slate.black' },
        text: { _light: 'almostBlack', _dark: 'white.primary' },
        border: { _light: 'lightGray', _dark: 'slate.dark' },
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