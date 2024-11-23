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
import { ChangeEvent, useRef } from 'react'
import {
  FieldValues,
  Path,
  UseFormRegisterReturn,
  UseFormWatch,
} from 'react-hook-form'

type Props<T extends FieldValues> = {
  label?: string
  helper?: string
  error?: string
  type?: string
  isRequired?: boolean
  register?: UseFormRegisterReturn<string>
  watch?: UseFormWatch<T>
  name: Path<T>
  onChangeState?: (e: ChangeEvent<HTMLInputElement>) => void
  value?: string | number
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
  value,
  onChangeState,
}: Props<T>) => {
  const [flag, setFlag] = useBoolean()
  // const [useValue, setValue] = useState((watch && watch(name)) || '')
  const ref = useRef(null)

  const useValue = watch ? watch(name) : value;

  useOutsideClick({
    ref: ref,
    handler: () => setFlag.off(),
  })

  return (
    <>
      <Box
        bgGradient={
          flag || useValue
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
          {label && (
            <FormLabel
              sx={{
                zIndex: 1,
                position: 'absolute',
                top: flag || useValue ? '-30%' : 1,
                left: flag || useValue ? '8px' : '10px',
                transition: 'all .3s ease',
                fontSize: flag || useValue ? 'xs' : 'md',
                fontWeight: '400',
                backgroundColor: 'background.main',
                paddingX: flag || useValue ? 2 : 1,
                color: flag || useValue ? 'text.bold' : 'text.pale',
              }}
            >
              {label}
            </FormLabel>
          )}
          <Input
            type={type}
            size={'sm'}
            variant={'form_input'}
            sx={flag || useValue ? { border: 'unset' } : {}}
            {...register}
            value={value}
            onChange={onChangeState}
          />
          {helper && !error && <FormHelperText>{helper}</FormHelperText>}
          {error && <FormErrorMessage>{error}</FormErrorMessage>}
        </FormControl>
      </Box>
    </>
  )
}

export default InputUI
