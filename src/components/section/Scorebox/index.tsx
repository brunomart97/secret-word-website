'use client'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useGame } from '../../../hooks/useGame'
import { idGenerator } from '../../../utils/idGenerator'
import { Scoreboard } from '../../ui/Scoreboard'
import { InfoPopup } from '../../ui/InfoPopup'

import styles from './styles.module.scss'
import { useEffect } from 'react'

export const Scorebox = () => {
  const i18n = useTranslations('i18n')
  const { playerLevel, matchPoints, totalPoints, levelKey, setInfoPopupData } =
    useGame()
  const [lastPlayerLevel, setLastPlayerLevel] = useState(playerLevel ?? 1)

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

  // message in popup
  useEffect(() => {
    if (
      playerLevel &&
      playerLevel > lastPlayerLevel &&
      levelKey?.keyWasDiscovered
    ) {
      const formatedPopupText = i18n('game.popupNextLevel')
        .replace('%1', levelKey.key)
        .replace('%2', playerLevel.toString())

      setInfoPopupData?.({
        text: formatedPopupText,
        seconds: 10,
        type: 'success'
      })
      setLastPlayerLevel(playerLevel)
    }
  }, [playerLevel, lastPlayerLevel, setInfoPopupData, levelKey])

  return (
    <>
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

      <InfoPopup />
    </>
  )
}
