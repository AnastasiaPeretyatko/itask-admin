import ToastAlert from '@/components/ui/toast/ToastAlert'
import { useToast } from '@chakra-ui/react'

export const useNotifications = () => {
  const toast = useToast()

  const showErrorMessage = (message: {
    title: string
    description?: string
  }) => {
    const { title: toastTitle, description: toastDescription } = message

    toast({
      position: 'bottom-right',
      render: ({ onClose }) => (
        <ToastAlert
          toastTitle={toastTitle}
          toastDescription={toastDescription}
          onClose={onClose}
        />
      ),
    })
  }

  const showSuccessMessage = (message: {
    title: string
    description?: string
  }) => {
    const { title: toastTitle, description: toastDescription } = message

    toast({
      position: 'bottom-right',
      render: ({ onClose }) => (
        <ToastAlert
          isSuccess
          toastTitle={toastTitle}
          toastDescription={toastDescription}
          onClose={onClose}
        />
      ),
    })
  }

  return { showErrorMessage, showSuccessMessage }
}
