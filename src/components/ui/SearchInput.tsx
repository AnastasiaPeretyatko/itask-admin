import { CloseIcon, SearchIcon } from '@chakra-ui/icons'
import {
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/react'

export type SearchInputProps = {
  value: string
  onChange: (value: string) => void
  onClearSearchInput?: () => void
}

const SearchInput = ({ onChange, value, onClearSearchInput }: SearchInputProps) => {
  return (
    <InputGroup width={80}>
      <Input
        variant={'search'}
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
            size={'xs'}
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
