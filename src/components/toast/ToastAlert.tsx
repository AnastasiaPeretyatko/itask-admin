import { Box, HStack, Icon, IconButton, Text, VStack } from '@chakra-ui/react'
import { CheckCircleIcon, CloseIcon } from '@chakra-ui/icons'

type Props = {
  toastTitle: string
  toastDescription?: string
  isSuccess?: boolean
  onClose?: () => void
}

const ToastAlert = ({
  toastTitle,
  toastDescription,
  isSuccess = false,
  onClose,
}: Props) => {
  return (
    <Box
      bg="notify.bg"
      p={4}
      borderRadius="lg"
      display="flex"
      flexDirection="column"
      gap={3}
      boxShadow='xl'
    >
      <HStack spacing={5}>
        {isSuccess ? (
          <Icon as={CheckCircleIcon} color="green.400" boxSize={7} />
        ) : (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            padding={2}
            borderRadius="50%"
            backgroundColor="red.500"
          >
            <Icon as={CloseIcon} color="notify.bg" boxSize={3}/>
          </Box>
        )}
        <Text fontWeight="bold" fontSize="lg" flexGrow="1">
          {toastTitle}
        </Text>
        <IconButton
          aria-label="Close"
          icon={<CloseIcon />}
          size="sm"
          variant="ghost"
          _hover={{ color: 'red.500' }}
          ml={3}
          onClick={onClose}
        />
      </HStack>
      <Text ml={12} fontSize="sm" color="text.pale">
        {toastDescription}
      </Text>
    </Box>
  )
}

export default ToastAlert