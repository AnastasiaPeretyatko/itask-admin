import Empty from '@/components/ui/Empty'
import FormInput from '@/components/ui/FormInput'
import { breakpoints } from '@/style/breakpoints'
import { formSetFunction, helpText, pattern } from '@/utils/formOptions'
import {
  Box,
  Button,
  Center,
  Checkbox,
  Flex,
  Heading,
  HStack,
  Link,
  SimpleGrid,
  useMediaQuery,
  VStack,
} from '@chakra-ui/react'
import { GetStaticPropsContext } from 'next'
import { SubmitHandler, useForm } from 'react-hook-form'

type AuthFromType = {
  email: string
  password: string
}

export default function AuthPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFromType>()
  const [isLarger] = useMediaQuery(`(min-width: ${breakpoints.lg})`)

  const onSubmit: SubmitHandler<AuthFromType> = data => null

  return (
    <SimpleGrid columns={{ md: 1, lg: 2 }} width={'100%'} height={'100vh'}>
      <Box bg="white" height="100%" overflow={'hidden'}>
        <Heading size={'md'} m={4}>
          ITASK | Admin
        </Heading>
        <Flex
          align={'center'}
          justify={'center'}
          width={'100%'}
          height={'100%'}
        >
          <VStack
            align={'start'}
            mb={24}
            gap={4}
            as={'form'}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Heading>Добро пожаловать</Heading>
            <Empty>С возвращаением! Пожалуйста введите email и пароль</Empty>
            <FormInput
              label="Email"
              type="email"
              register={register('email', {
                required: true,
                pattern: pattern.email,
                setValueAs: formSetFunction.trim,
              })}
              helperText={helpText.email}
              errorMessage={errors.email?.message}
            />
            <FormInput
              label="Password"
              type="password"
              register={register('password', {
                required: true,
                setValueAs: formSetFunction.trim,
              })}
              errorMessage={errors.password?.message}
              helperText={helpText.password}
            />
            <HStack width={'100%'} justify={'space-between'} mt={8}>
              <Checkbox>Запомнить меня</Checkbox>
              <Link color={'primary.purple'}>Забыли пароль?</Link>
            </HStack>
            <Button variant={'primary'} width={'100%'} type={'submit'}>
              Войти
            </Button>
          </VStack>
        </Flex>
      </Box>

      <Box bg="gray.100" height="100%" display={isLarger ? 'block' : 'none'}>
        <Center height={'100%'} position={'relative'}>
          <Box
            width={48}
            height={48}
            bg="primary.purple"
            borderRadius={'full'}
          />
          <Box
            width={'100%'}
            height={'50%'}
            position={'absolute'}
            bottom={0}
            backdropFilter={'blur(10px)'}
          />
        </Center>
      </Box>
    </SimpleGrid>
  )
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../messages/${locale}.json`)).default,
    },
  }
}
