import { useState, useEffect } from 'react'
import { IoIosArrowDown } from 'react-icons/io'

import styles from './styles.module.scss'

type AccordionProps = {
  openAccordionIndex: number
  setOpenAccordionIndex: (openAccordionIndex: number) => void
  index: number
  title: string
  text: string
}

export const Accordion = ({
  openAccordionIndex,
  setOpenAccordionIndex,
  index,
  title,
  text
}: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (index === openAccordionIndex) {
      setIsOpen(true)
    } else {
      setIsOpen(false)
    }
  }, [openAccordionIndex])

  return (
    <div className={styles.accordionContainer}>
      <button
        className={styles.accordionButton}
        onClick={() =>
          isOpen ? setOpenAccordionIndex(0) : setOpenAccordionIndex(index)
        }
      >
        <h2 className={styles.accordionTitle}>{title}</h2>
        <IoIosArrowDown
          color={isOpen ? 'var(--splash)' : 'var(--tertiary)'}
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </button>

      {isOpen && <p className={styles.accordionText}>{text}</p>}
    </div>
  )
}
