import {
  defineStyle,
  defineStyleConfig,
  StyleFunctionProps,
} from '@chakra-ui/react'

// define the base component styles
const baseStyle = defineStyle(() => {
  return {
    padding: 0,
    maxW: 'unset',
    width: 'unset',
  }
})

const viewDate = defineStyle(() => {
  return {
    borderRadius: '5px',
    backgroundColor: 'BLACK_400',
    color: 'white',
    fontSize: 'sm',
    // padding: '1px 5px',
    margin: 0,
    width: 'min-content',
    height: '100%',
    whiteSpace: 'nowrap',
  }
})

const header = defineStyle(() => {
  return {
    display: 'flex',
    flexDir: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '20px',
    paddingY: '10px',
    marginX: '10px',
    borderBottom: '1px solid',
    borderColor: 'whiteAlpha.200',
  }
})

const boxTheme = defineStyle(() => {
  return {
    width:'100%',
    backgroundColor: 'background.switch',
    display: 'flex',
    flexDir: 'row',
    padding: 1.5,
    borderRadius: 'md',
    gap: 1,
    margin: 0,
  }
})

const selector = defineStyle(() => {
  return {
    display: 'flex',
    flexDir: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    borderRadius: '10px',
    border: '1px solid',
    borderColor: 'fill.switch',
    position: 'relative',
    padding: 2,
    fontSize: 'sm',
    bg: 'bg',
  }
})

const selectorLine = defineStyle(() => {
  return {
    display: 'flex',
    flexDir: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    borderRadius: 'xl',
    position: 'relative',
    padding: 0.5,
    fontSize: 'sm',
  }
})

const label = defineStyle(() => {
  return {
    zIndex: 1,
    position: 'absolute',
    left: '10px',
    transition: 'all .3s ease',
    backgroundColor: 'bg',
    paddingX: 1,
  }
})

const sidebar = defineStyle(() => {
  return {
    display: 'flex',
    flexDir: 'column',
    width: '256px',
    height: '100vh',
  }
})

export const containerTheme = defineStyleConfig({
  baseStyle,
  variants: {
    header,
    viewDate,
    boxTheme,
    selector,
    label,
    selectorLine,
    sidebar,
  },
})
