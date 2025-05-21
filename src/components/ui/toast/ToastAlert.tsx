import { CheckIcon, NotAllowedIcon } from '@chakra-ui/icons';
import { Box, HStack, Text } from '@chakra-ui/react';

const ToastAlert = ({ status, message }: { status: boolean, message: string}) => {
  return (
    <HStack
      background={'toast.bg'}
      color={'toast.text'}
      paddingX={3}
      paddingY={2}
      borderRadius={'md'}
      maxW={'500px'}
    >
      <Box
        padding={1}
        border="1px solid white.50"
        borderRadius={'full'}
      >
        {status ? <CheckIcon/> : <NotAllowedIcon/>}
      </Box>
      <Text noOfLines={3}>{message}</Text>
    </HStack>
  );
};

export default ToastAlert;