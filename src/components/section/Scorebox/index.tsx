'use client'
import { useTranslations } from 'next-intl'
import { useGame } from '../../../hooks/useGame'
import { idGenerator } from '../../../utils/idGenerator'
import { Scoreboard } from '../../ui/Scoreboard'

import styles from './styles.module.scss'

export const Scorebox = () => {
  const i18n = useTranslations('i18n')
  const { playerLevel, matchPoints, totalPoints } = useGame()

  const scoreList = [
    {
      value: playerLevel,
      text: i18n('game.playerLevelText'),
      animationDuration: 0
    },
    {
      value: matchPoints,
      text: i18n('game.matchPointsText'),
      animationDuration: 1.5
    },
    {
      value: totalPoints,
      text: i18n('game.totalPointsText'),
      animationDuration: 0
    }
  ]

  return (
    <section className={styles.scoreboxContainer}>
      {scoreList.map(({ value, text, animationDuration }) => (
        <Scoreboard
          value={value ?? 0}
          text={text}
          animationDuration={animationDuration}
          key={idGenerator(text)}
        />
      ))}
    </section>
  )
}
