import {
  Box,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  useBoolean,
  useOutsideClick,
} from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

type Props = {
  label: string
  helper?: string
  error?: string
  type?: string
  isRequired?: boolean
  register: UseFormRegisterReturn<string>
}

const CustomeInput = ({
  label,
  error,
  helper,
  type = 'text',
  isRequired = false,
  register,
}: Props) => {
  const [flag, setFlag] = useBoolean()
  const ref = useRef(null)
  const [value, setValue] = useState<string>('')
  useOutsideClick({
    ref: ref,
    handler: () => setFlag.off(),
  })

  return (
    <>
      <Box
        bgGradient={
          flag || value
            ? 'linear(to-r, SECONDARY_BLUE, PRIMARY_PURPLE)'
            : 'none'
        }
        padding={0.5}
        borderRadius={'xl'}
      >
        <FormControl
          ref={ref}
          isRequired={isRequired}
          position={'relative'}
          onClick={setFlag.on}
        >
          <FormLabel
            sx={{
              zIndex: 1,
              position: 'absolute',
              top: flag || value ? '-30%' : 1,
              left: '10px',
              transition: 'all .3s ease',
              fontSize: flag || value ? 'xs' : 'md',
              backgroundColor: 'bg',
              paddingX: 1,
              opacity: flag || value ? 0.7 : 0.5,
            }}
          >
            {label}
          </FormLabel>
          <Input
            type={type}
            size={'sm'}
            variant={'form_input'}
            {...register}
            onChange={e => setValue(e.target.value)}
          />
          {helper && !error && <FormHelperText>{helper}</FormHelperText>}
          {error && <FormErrorMessage>{error}</FormErrorMessage>}
        </FormControl>
      </Box>
    </>
  )
}

export default CustomeInput
