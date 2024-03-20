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
      text: i18n('game.playerLevelText')
    },
    {
      value: matchPoints,
      text: i18n('game.matchPointsText')
    },
    {
      value: totalPoints,
      text: i18n('game.totalPointsText')
    }
  ]

  return (
    <section className={styles.scoreboxContainer}>
      {scoreList.map(({ value, text }) => (
        <Scoreboard value={value ?? 0} text={text} key={idGenerator(text)} />
      ))}
    </section>
  )
}
