import {
  FormControl,
  List,
  ListItem,
  useBoolean,
  useOutsideClick,
} from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form'
import FormInput from '../FormInput'

type Props<T extends FieldValues> = {
  array: { id: string; name: string }[]
  label?: string
  name: FieldPath<T>
  control: Control<T>
  // onChangeState: (item: string) => void
  currentValue?: string
}

const SelectForm = <T extends FieldValues>({
  array,
  label,
  name,
  control,
  // onChangeState,
  currentValue,
}: Props<T>) => {
  const [value, setValue] = useState<string>('')

  const ref = useRef(null)
  const [isOpen, setIsOpen] = useBoolean()

  useOutsideClick({
    ref: ref,
    handler: () => setIsOpen.off(),
  })

  // const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
  //   setValue(e.target.value) // запись в инпут

  //   onChangeState(e.target.value) // оправка запроса

  //   if (array.length > 0) {
  //     setIsOpen.on()
  //   } else {
  //     setIsOpen.off()
  //   }
  // }

  return (
    <>
      <FormControl
        width={'full'}
        position={'relative'}
        ref={ref}
        padding={0}
      >
        <Controller
          name={name}
          control={control}
          rules={{ required: 'This field is required' }} //TODO обязательное поле. Позже вынести в пропс
          render={({ field }) => (
            <>
              <FormInput label={label} value={currentValue ?? value} />
              {isOpen && (
                <List variant={'selectList'} zIndex={10}>
                  {array.map((item, index) => (
                    <ListItem
                      key={index}
                      onClick={() => {
                        setIsOpen.toggle()
                        setValue(item.name)
                        field.onChange(item.id)
                      }}
                    >
                      {item.name}
                    </ListItem>
                  ))}
                </List>
              )}
            </>
          )}
        />
      </FormControl>
    </>
  )
}

export default SelectForm
