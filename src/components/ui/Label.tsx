import { Container } from '@chakra-ui/react'
import React from 'react'

type Props = {
  text: string
  isFocus: boolean
}

const Label = ({ text, isFocus }: Props) => {
  return (
    <Container
      sx={{
        zIndex: 1,
        position: 'absolute',
        top: isFocus ? '-30%' : 1,
        left: '10px',
        transition: 'all .3s ease',
        fontSize: isFocus ? 'xs' : 'md',
        backgroundColor: 'bg',
        paddingX: 1,
        opacity: isFocus ? 0.7 : 0.5,
      }}
    >
      {text}
    </Container>
  )
}

export default Label
