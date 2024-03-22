import { IoCloseOutline } from 'react-icons/io5'
import type { ReactNode, MouseEvent } from 'react'

import styles from './styles.module.scss'

type ModalProps = {
  children: ReactNode
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  backgroundColor?: string
  borderRadius?: string
}

export const Modal = ({
  children,
  isOpen,
  setIsOpen,
  backgroundColor = 'var(--primary)',
  borderRadius = '15px'
}: ModalProps) => {
  const handleCloseModal = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()

    if (event.target === event.currentTarget) {
      setIsOpen(false)
    }
  }

  if (!isOpen) {
    return null
  }

  return (
    <div className={styles.modalOverlay} onClick={() => setIsOpen(false)}>
      <section
        className={styles.modalContainer}
        onClick={handleCloseModal}
        style={{ backgroundColor, borderRadius }}
      >
        <div className={styles.modalHeader}>
          <button
            className={styles.modalHeaderCloseButton}
            onClick={() => setIsOpen(false)}
          >
            <IoCloseOutline color="var(--tertiary)" />
          </button>
        </div>
        {children}
      </section>
    </div>
  )
}
