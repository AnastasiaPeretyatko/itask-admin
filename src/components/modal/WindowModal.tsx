import { AddIcon } from '@chakra-ui/icons'
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import { useTranslations } from 'next-intl'
import React, { ReactNode, useEffect } from 'react'

type Props = {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
  action?: ReactNode
  modalBody: (onClose: () => void) => ReactNode
  title: string
  isNotAction?: boolean
}

const WindowModal = ({
  size = 'xl',
  action,
  modalBody,
  title,
  isNotAction = false,
}: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const t = useTranslations()

  const ActionButton = React.isValidElement(action)
    ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
      React.cloneElement(action as React.ReactElement<any>, { onClick: onOpen })
    : action

  useEffect(() => {
    if(isNotAction){
      onOpen()
    }

  }, [isNotAction, onOpen])

  return (
    <>
      {!isNotAction ? (
        action ? (
          ActionButton
        ) : (
          <Button
            size={'sm'}
            variant={'primary'}
            onClick={onOpen}
            leftIcon={<AddIcon boxSize={3} />}
          >
            {t('Create')}
          </Button>
        )
      ) : null}
      {/* {} */}

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
