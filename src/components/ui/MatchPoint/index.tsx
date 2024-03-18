import { useTranslations } from 'next-intl'
import { useGame } from '../../../hooks/useGame'
import CountUp from 'react-countup'

import styles from './styles.module.scss'

export const MatchPoint = () => {
  const i18n = useTranslations('i18n')
  const { matchPoints } = useGame()

  return (
    <div className={styles.matchPointContainer}>
      <CountUp className={styles.matchPointNumber} end={matchPoints ?? 0} />
      <span className={styles.matchPointDescription}>
        {i18n('game.descriptionMatchPoints')}
      </span>
    </div>
  )
}
