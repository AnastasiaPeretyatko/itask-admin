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
import { useRef } from 'react'
import {
  FieldValues,
  Path,
  UseFormRegisterReturn,
  UseFormWatch,
} from 'react-hook-form'

type Props<T extends FieldValues> = {
  label: string
  helper?: string
  error?: string
  type?: string
  isRequired?: boolean
  register: UseFormRegisterReturn<string>
  watch: UseFormWatch<T>
  name: Path<T>
}

const InputUI = <T extends FieldValues>({
  label,
  error,
  helper,
  type = 'text',
  isRequired = false,
  register,
  watch,
  name,
}: Props<T>) => {
  const [flag, setFlag] = useBoolean()
  const ref = useRef(null)

  useOutsideClick({
    ref: ref,
    handler: () => setFlag.off(),
  })
  console.log('REgister', register)

  return (
    <>
      <Box
        bgGradient={
          flag || watch(name)
            ? 'linear(to-r, secondary.blue, primary.purple)'
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
              top: flag || watch(name) ? '-30%' : 1,
              left: flag || watch(name) ? '8px' : '10px',
              transition: 'all .3s ease',
              fontSize: flag || watch(name) ? 'xs' : 'md',
              fontWeight: '400',
              backgroundColor: 'background.main',
              paddingX: flag || watch(name) ? 2 : 1,
              color: flag || watch(name) ? 'text.bold' : 'text.pale',
            }}
          >
            {label}
          </FormLabel>
          <Input
            type={type}
            size={'sm'}
            variant={'form_input'}
            sx={flag || watch(name) ? { border: 'unset' } : {}}
            {...register}
          />
          {helper && !error && <FormHelperText>{helper}</FormHelperText>}
          {error && <FormErrorMessage>{error}</FormErrorMessage>}
        </FormControl>
      </Box>
    </>
  )
}

export default InputUI
