import { useToast } from '@chakra-ui/react';
import ToastAlert from '@/components/ui/toast/ToastAlert';

export const useNotifications = () => {
  const toast = useToast();

  const showErrorMessage = (message: string) => {
    toast({
      position: 'bottom-left',
      render: () => <ToastAlert message={message} />,
    });
  };

  const showSuccessMessage = (message:string) => {
    toast({
      position: 'bottom-left',
      render: () => <ToastAlert message={message} />,
    });
  };

  return { showErrorMessage, showSuccessMessage };
};
