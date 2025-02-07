import { ComponentWithAs, IconProps, MenuItem, Text } from '@chakra-ui/react';
import React from 'react';

type Props = {
  label?: string
  icon?: ComponentWithAs<'svg', IconProps>
  onClick?: () => void
  isDelete?: boolean
  isDisabled?: boolean
}

const CustomMenuItem = ({
  label,
  icon,
  onClick,
  isDelete,
  isDisabled,
}: Props) => {
  const ComponentIcon = icon as ComponentWithAs<'svg', IconProps>;
  console.log(label, isDisabled);
  return (
    <MenuItem
      isDisabled={isDisabled}
      sx={{
        display: 'flex',
        gap: 2,
        _hover: {
          bg: isDelete ? 'red.100' : 'background.switch',
          color: isDelete ? 'red' : 'text.bold',
          fontWeight: 500,
        },
      }}
      onClick={onClick}
    >
      <ComponentIcon boxSize={3} />
      <Text>{label}</Text>
    </MenuItem>
  );
};

export default CustomMenuItem;
