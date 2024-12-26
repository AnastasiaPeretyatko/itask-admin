import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

// define the base component styles
const baseStyle = defineStyle(() => {
  return {
    // padding: 0,
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
    position: 'sticky',
    top: 0,
    zIndex: 10,
    backgroundColor: 'background.main',
    width: 'full',
    display: 'flex',
    flexDir: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '20px',
    padding: 4,
    // borderColor: 'whiteAlpha.200',
    boxShadow:'0 4px 2px -2px #80808021',
    borderRadius: '10px'
  }
})

const boxTheme = defineStyle(() => {
  return {
    width: '100%',
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
    borderColor: 'input.outline',
    position: 'relative',
    paddingY: 1,
    paddingX: 3,
    fontSize: 'sm',
    bg: 'background.main',
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

const wrapper_table = defineStyle(() => {
  return {
    // width: 'full',
    margin: 2,
    padding: 2,
    borderRadius: '10px',
    backgroundColor: 'background.main',
  }
})

const sidebar = defineStyle(() => {
  return {
    bg: 'background.main',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    overflow: 'hidden',
    position: 'sticky',
    top: 0,
    padding: 4,
    gap: 4
  }
});

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
    wrapper_table
  },
})
