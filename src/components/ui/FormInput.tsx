import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { ChangeEvent, useMemo, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

type Props = {
  label?: string
  type?: 'text' | 'password' | 'email'
  register?: UseFormRegisterReturn<string>
  value?: string
  onChangeInput?: (e: ChangeEvent<HTMLInputElement>) => void
  errorMessage?: string | null
  helperText?: string
}

const FormInput = ({
  label,
  type = 'text',
  register,
  errorMessage,
  helperText,
  value,
  onChangeInput
}: Props) => {
  const [isShowPassword, setIsShowPassword] = useState(type);

  const isPassword = useMemo(() => {
    if (type === 'password') {
      return (
        <InputRightElement height={'100%'}>
          <IconButton
            aria-label="show password"
            variant={'unstyled'}
            icon={
              isShowPassword === 'password' ? <ViewOffIcon /> : <ViewIcon />
            }
            onClick={() =>
              setIsShowPassword((prev) =>
                prev === 'password' ? 'text' : 'password',
              )
            }
          />
        </InputRightElement>
      );
    }
  }, [isShowPassword, type]);

  return (
    <FormControl isInvalid={!!errorMessage}>
      <FormLabel color={'text.bold'}>{label}</FormLabel>
      <InputGroup>
        <Input
          variant={'form_input'}
          type={isShowPassword}
          {...register}
          value={value}
          size={'sm'}
          placeholder={label}
          onChange={onChangeInput}
        />
        {isPassword}
      </InputGroup>
      {!errorMessage ? (
        <FormHelperText color={'text.pale'}>{helperText}</FormHelperText>
      ) : (
        <FormErrorMessage>{errorMessage}</FormErrorMessage>
      )}
    </FormControl>
  );
};

export default FormInput;
