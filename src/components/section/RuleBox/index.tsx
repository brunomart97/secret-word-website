'use client'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Accordion } from '../../ui/Accordion'
import { idGenerator } from '../../../utils/idGenerator'

import styles from './styles.module.scss'

export const RuleBox = () => {
  const [openAccordionIndex, setOpenAccordionIndex] = useState(0)

  const i18n = useTranslations('i18n')

  return (
    <section className={styles.ruleBoxContainer}>
      <h1 className={styles.ruleBoxTitle}>{i18n('rules.title')}</h1>

      {Array.from({ length: 11 }).map((_, index) => (
        <Accordion
          openAccordionIndex={openAccordionIndex}
          setOpenAccordionIndex={setOpenAccordionIndex}
          index={index + 1}
          title={`${index + 1} - ${i18n(`rules.ruleList.${index + 1}.title`)}`}
          text={i18n(`rules.ruleList.${index + 1}.text`)}
          key={idGenerator(index + 1)}
        />
      ))}
    </section>
  )
}
