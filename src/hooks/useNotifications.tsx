import { useToast } from '@chakra-ui/react';
import ToastAlert from '@/components/ui/toast/ToastAlert';

export const useNotifications = () => {
  const toast = useToast();

  const showErrorMessage = (data: {message: string} | string) => {
    toast({
      position: 'bottom-left',
      render: () => <ToastAlert message={data?.message ?? data} />,
    });
  };

  const showSuccessMessage = (data: {message: string} | string) => {
    toast({
      position: 'bottom-left',
      render: () => <ToastAlert message={data?.message ?? data} />,
    });
  };

  return { showErrorMessage, showSuccessMessage };
};
