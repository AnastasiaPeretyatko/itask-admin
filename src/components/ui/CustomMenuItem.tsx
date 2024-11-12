import {
  ComponentWithAs,
  Icon,
  IconProps,
  MenuItem,
  Text,
} from '@chakra-ui/react'
import React from 'react'

type Props = {
  lable: string
  icon?: ComponentWithAs<'svg', IconProps>
  onClick?: () => void
  isDelete?: boolean
  isDisabled?: boolean
}

const CustomMenuItem = ({
  lable,
  icon,
  onClick,
  isDelete,
  isDisabled,
}: Props) => {
  return (
    <MenuItem
      isDisabled={isDisabled}
      sx={{
        _hover: {
          bg: isDelete ? 'red.100' : 'background.switch',
          color: isDelete ? 'red' : 'BLACK_200',
        },
      }}
      onClick={onClick}
    >
      <Icon as={icon} />
      <Text>{lable}</Text>
    </MenuItem>
  )
}

export default CustomMenuItem
