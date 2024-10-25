"use client"

import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import { ColorModeProvider } from "./color-mode"
import { system } from '@/style/theme'
// import theme from '@/style/ThemeProvider'

export function Provider(props: React.PropsWithChildren) {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider>{props.children}</ColorModeProvider>
    </ChakraProvider>
  )
}
