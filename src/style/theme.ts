import { createSystem, defaultConfig } from "@chakra-ui/react"

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      fonts: {},
      colors: {
        PRIMARY_BLUE: { value: '#2A85FF' },
        PRIMARY_GREEN: { value: '#83BF6E' },
        PRIMARY_ORANGE: { value: '#FF6A55' },
        PRIMARY_PURPLE: { value: '#8E59FF' },

        SECONDARY_BLUE: { value: '#B1E5FC' },
        SECONDARY_GREEN: { value: '#B5E4CA' },
        SECONDARY_ORANGE: { value: '#FFBC99' },
        SECONDARY_PURPLE: { value: '#CABDFF' },

        BLACK_100: { value: '#111315' },
        BLACK_200: { value: '#1A1D1F' },
        BLACK_300: { value: '#272B30' },
        BLACK_400: { value: '#303336' },
      }
    },
  },
  globalCss: {
    "body": {
      // backgroundColor: 'primary'
    }
  }
})
