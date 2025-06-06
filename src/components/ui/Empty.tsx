import { Text } from '@chakra-ui/react';

type Props = {
  size?: 'xs' | 'sm' | 'md' | 'lg'
  children: string[] | string
  color?: string
  marginBottom?: string | number
}

const Empty = ({ size = 'sm', children, color, marginBottom = 0 }: Props) => {
  return (
    <Text
      fontSize={size}
      color={color}
      marginBottom={marginBottom}
    >
      {children}
    </Text>
  );
};

export default Empty;
