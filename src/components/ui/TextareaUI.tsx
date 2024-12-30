import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  InputGroup,
  Textarea,
} from '@chakra-ui/react'
import React from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

type Props = {
  label?: string
  register: UseFormRegisterReturn<string>
  errorMessage?: string | null
  helperText?: string
}

const TextareaUI = ({ label, register, errorMessage, helperText }: Props) => {
  return (
    <FormControl isInvalid={!!errorMessage}>
      <FormLabel>{label}</FormLabel>
      <InputGroup>
        <Textarea
          variant={'form_input'}
          {...register}
          size={'sm'}
          placeholder={label}
        />
      </InputGroup>
      {!errorMessage ? (
        <FormHelperText color={'text.pale'}>{helperText}</FormHelperText>
      ) : (
        <FormErrorMessage>{errorMessage}</FormErrorMessage>
      )}
    </FormControl>
  )
}

export default TextareaUI
