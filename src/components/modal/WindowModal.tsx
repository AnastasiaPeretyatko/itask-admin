import { AddIcon } from '@chakra-ui/icons'
import { Button, Modal, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import { useTranslations } from 'next-intl'
import React, { ReactNode } from 'react'

type Props = {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
  action?: ReactNode
  children: (onClose: () => void) => ReactNode
}

const WindowModal = ({ size = 'xl', action, children }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const t = useTranslations()

  const ActionButton = React.isValidElement(action)
    ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
      React.cloneElement(action as React.ReactElement<any>, { onClick: onOpen })
    : action

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
          {t('Create')}
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
        {children(onClose)}
      </Modal>
    </>
  )
}

export default WindowModal
