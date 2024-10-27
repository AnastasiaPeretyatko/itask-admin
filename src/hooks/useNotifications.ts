import { useToast } from '@chakra-ui/react'

export const useNotifications = () => {
	const toast = useToast()

	const showErrorMessage = (title: string) => {
		toast({
			title,
			position: 'top',
			status: 'error',
			isClosable: true,
		})
	}

	const showSuccessMessage = (title: string) => {
		toast({
			title,
			position: 'top',
			status: 'success',
			isClosable: true,
		})
	}
	return { showErrorMessage, showSuccessMessage }
}
