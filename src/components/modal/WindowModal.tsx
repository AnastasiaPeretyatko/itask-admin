import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import React, { ReactNode } from 'react'

type Props = {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
  action: ReactNode
  modalBody: (onClose: () => void) => ReactNode
  title: string
}

const WindowModal = ({ size = 'xl', action, modalBody, title }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const ActionButton = React.isValidElement(action)
    ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
      React.cloneElement(action as React.ReactElement<any>, { onClick: onOpen })
    : action

  return (
    <>
      {ActionButton}

      <Modal
        size={size}
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{modalBody(onClose)}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default WindowModal
