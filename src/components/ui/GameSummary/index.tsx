import CountUp from 'react-countup'
import { useGame } from '../../../hooks/useGame'
import { useTranslations } from 'next-intl'
import { idGenerator } from '../../../utils/idGenerator'
import { MainButton } from '../MainButton'

import styles from './styles.module.scss'

export const GameSummary = () => {
  const { playerLevel, totalPoints } = useGame()
  const i18n = useTranslations('i18n')

  const summaryList = [
    {
      value: playerLevel,
      text: i18n('game.playerLevelText')
    },
    {
      value: totalPoints,
      text: i18n('game.totalPointsText')
    }
  ]

  return (
    <div className={styles.gameSummaryContainer}>
      <div className={styles.gameSummarySubcontainer}>
        <div className={styles.gameSummaryLevel}>
          {summaryList.map(({ value, text }) => (
            <div className={styles.gameSummaryLevelBox} key={idGenerator(text)}>
              <h2 className={styles.gameSummaryLevelTitle}>{text}</h2>
              <CountUp
                className={styles.gameSummaryLevelNumber}
                end={value ?? 0}
                decimals={playerLevel?.toString().includes('.') ? 2 : 0}
                duration={1.5}
              />
            </div>
          ))}
        </div>

        <MainButton
          text={i18n('home.gameSummary.resetLevelButtonText')}
          action={() => null}
          color="var(--tertiary)"
          backgroundColor="var(--secondary)"
        />
      </div>
    </div>
  )
}
