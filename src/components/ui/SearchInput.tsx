import { CloseIcon, SearchIcon } from '@chakra-ui/icons';
import {
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/react';

export type SearchInputProps = {
  value: string
  onChange: (value: string) => void
  onClearSearchInput?: () => void
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
  isDisabled?: boolean
  placeholder?: string
}

const SearchInput = ({
  onChange,
  value,
  onClearSearchInput,
  size = 'md',
  isDisabled = false,
  placeholder = 'Search',
}: SearchInputProps) => {
  return (
    <InputGroup
      width={80}
      size={size}
    >
      <Input
        variant={'search'}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        isDisabled={isDisabled}
      />
      <InputLeftElement>
        <SearchIcon />
      </InputLeftElement>
      <InputRightElement>
        {value ? (
          <IconButton
            size={'xs'}
            variant={'unstyled'}
            aria-label="remove search input"
            icon={<CloseIcon />}
            onClick={onClearSearchInput}
          />
        ) : null}
      </InputRightElement>
    </InputGroup>
  );
};

export default SearchInput;
