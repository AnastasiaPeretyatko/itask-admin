import { CloseIcon, SearchIcon } from '@chakra-ui/icons'
import {
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/react'

type Props = {
  value: string
  onChange: (value: string) => void
  onClearSearchInput?: () => void
}

const SearchInput = ({ onChange, value, onClearSearchInput }: Props) => {
  return (
    <InputGroup width={80}>
      <Input
        placeholder="Search"
        value={value}
        onChange={e => onChange(e.target.value)}
      />
      <InputLeftElement>
        <SearchIcon />
      </InputLeftElement>
      <InputRightElement>
        {value && (
          <IconButton
            variant={'unstyled'}
            aria-label="remove search input"
            icon={<CloseIcon />}
            onClick={onClearSearchInput}
          />
        )}
      </InputRightElement>
    </InputGroup>
  )
}

export default SearchInput
