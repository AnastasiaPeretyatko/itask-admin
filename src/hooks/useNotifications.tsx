import ToastAlert from '@/components/toast/ToastAlert'
import { useToast } from '@chakra-ui/react'

export const useNotifications = () => {
  const toast = useToast()

  const showErrorMessage = (toastTitle: string, toastDescription?: string) => {
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

  const showSuccessMessage = (toastTitle: string, toastDescription?: string) => {
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
