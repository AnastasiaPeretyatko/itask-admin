import { defineStyle, defineStyleConfig } from '@chakra-ui/react'


const baseStyle = defineStyle(() => {
  return {
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
    margin: 0,
    width: 'min-content',
    height: '100%',
    whiteSpace: 'nowrap',
  }
})

const header = defineStyle(() => {
  return {
    position: 'relative',
    top: 0,
    zIndex: 0,
    width: 'full',
    display: 'flex',
    flexDir: 'row',
    alignItems: 'center',
    justifyContent: 'end',
    gap: '20px',
    padding: 4,
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
    boxShadow: 'base',
    position: 'relative',
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
