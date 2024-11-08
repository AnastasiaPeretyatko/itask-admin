import { Text } from '@chakra-ui/react'

type Props = {
  size?: 'xs' | 'sm' | 'md' | 'lg'
  children: string[] | string
  color?: 'text.pale'
}

const Empty = ({ size = 'sm', children, color = 'text.pale' }: Props) => {
  return (
    <Text fontSize={size} color={color}>
      {children}
    </Text>
  )
}

export default Empty
