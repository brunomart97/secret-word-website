'use client'
import { useState } from 'react'
import { useGame } from '../../../hooks/useGame'
import { idGenerator } from '../../../utils/idGenerator'
import { useTranslations } from 'next-intl'
import { ClueCard } from '../../ui/ClueCard'

import styles from './styles.module.scss'

export const Clues = () => {
  const {
    levelData,
    chosenClues,
    setChosenClues,
    matchPoints,
    setMatchPoints
  } = useGame()
  const i18n = useTranslations('i18n')

  return (
    <section className={styles.cluesContainer}>
      <h2 className={styles.cluesTitle}>{i18n('game.cluesTitle')}</h2>
      <span className={styles.cluesDescription}>
        {i18n('game.cluesDescription')}
      </span>
      <div className={styles.cluesSubcontainer}>
        {levelData?.clues?.map((clue, index) => (
          <ClueCard
            word={clue}
            number={index + 1}
            chosenClues={chosenClues}
            setChosenClues={setChosenClues}
            matchPoints={matchPoints}
            setMatchPoints={setMatchPoints}
            key={idGenerator(clue)}
          />
        ))}
      </div>
    </section>
  )
}
