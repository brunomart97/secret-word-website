import { useGame } from '../../../hooks/useGame'
import { useTranslations } from 'next-intl'
import { idGenerator } from '../../../utils/idGenerator'
import { Scoreboard } from '../../ui/Scoreboard'
import { MainButton } from '../../ui/MainButton'

import styles from './styles.module.scss'

export const GameOver = () => {
  const { playerLevel, totalPoints, resetGame } = useGame()
  const i18n = useTranslations('i18n')

  const scoreList = [
    {
      value: playerLevel,
      text: i18n('game.playerLevelText'),
      animationDuration: 0
    },
    {
      value: totalPoints,
      text: i18n('game.totalPointsText'),
      animationDuration: 0
    }
  ]

  return (
    <section className={styles.gameOverContainer}>
      <h1 className={styles.gameOverTitle}>
        {i18n('game.gameOver.gameOverTitle')}
      </h1>
      <h2 className={styles.gameOverSubtitle}>
        {i18n('game.gameOver.gameOverSubtitle')}
      </h2>

      <div className={styles.gameOverScore}>
        {scoreList.map(({ value, text, animationDuration }) => (
          <Scoreboard
            value={value ?? 0}
            text={text}
            animationDuration={animationDuration}
            key={idGenerator(text)}
          />
        ))}
      </div>

      <p className={styles.gameOverText}>
        {i18n('game.gameOver.gameOverText')}
      </p>

      <MainButton
        text={i18n('game.gameOver.gameOverResetButtonText')}
        action={() => resetGame?.()}
        color="var(--secondary)"
        backgroundColor="var(--splash)"
      />
    </section>
  )
}
