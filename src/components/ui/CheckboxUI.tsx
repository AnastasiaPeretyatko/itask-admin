import { Checkbox } from '@chakra-ui/react'
import React from 'react'

type Props = {
  isChecked: boolean
  indeterminate?: boolean
  onCheckedChange: () => void
  lable?: string
}

const CheckboxUI = ({
  lable,
  isChecked,
  indeterminate,
  onCheckedChange,
}: Props) => {
  return (
    <>
      {lable}
      <Checkbox
        isChecked={isChecked}
        isIndeterminate={indeterminate}
        onChange={onCheckedChange}
      />
    </>
  )
}

export default CheckboxUI