import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Button, HStack, IconButton } from '@chakra-ui/react';

type Props = {
  limit: number
  page: number
  count: number
  onChangePage: (page: number) => void
}

const Pagination = ({ count, limit, page, onChangePage }: Props) => {
  const arrayPages = Array.from({ length: Math.ceil(count / limit) }, (v, i) => i + 1);


  if(!arrayPages.length || arrayPages.length === 1) {
    return null;
  }

  return (
    <HStack>
      <IconButton
        variant={'pagination'}
        aria-label=""
        icon={<ChevronLeftIcon />}
        isDisabled={page - 1 === 0}
        onClick={() => onChangePage(page - 1)}
      />
      {arrayPages.map((el) => (
        <Button
          size={'sm'}
          variant={'pagination'}
          key={'pagination' + el}
          isActive={el === page}
          onClick={() => onChangePage(el)}
        >
          {el}
        </Button>
      ))}
      <IconButton
        variant={'pagination'}
        aria-label=""
        icon={<ChevronRightIcon />}
        isDisabled={page === arrayPages.at(-1)}
        onClick={() => onChangePage(page + 1)}
      />
    </HStack>
  );
};

export default Pagination;
