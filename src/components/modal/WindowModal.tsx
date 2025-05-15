import { AddIcon } from '@chakra-ui/icons';
import { Button, Modal, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

type Props = {
  title?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | 'full'
  action?: ReactNode
  body: (onClose: () => void) => ReactNode
}

const WindowModal = ({ size = '2xl', action, body, title }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const ActionButton = React.isValidElement(action)
    ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
    React.cloneElement(action as React.ReactElement<any>, { onClick: onOpen })
    : action;

  return (
    <>
      {action ? (
        ActionButton
      ) : (
        <Button
          size={'sm'}
          variant={'primary'}
          onClick={onOpen}
          leftIcon={<AddIcon boxSize={3} />}
        >
          {title ||'Add'}
        </Button>
      )}

      <Modal
        size={size}
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        {body(onClose)}
      </Modal>
    </>
  );
};

export default WindowModal;
