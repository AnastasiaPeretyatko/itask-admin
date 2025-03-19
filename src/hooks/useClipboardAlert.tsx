import { Box, useToast } from '@chakra-ui/react';

export const useClipboardAlert = () => {
  const toast = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast({
          title: 'Скопировано!',
          render: () => (
            <Box
              boxShadow={'black.24 0px 3px 8px'}
              background={'background.fill'}
              padding={4}
              borderRadius={10}
              fontWeight={400}
              fontSize={'sm'}
            >
              Текст был скопирован в буфер обмена.
            </Box>
          ),
          duration: 2000,
          isClosable: true,
          position: 'top',
        });
      });
  };

  return { copyToClipboard };
};
