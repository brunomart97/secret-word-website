import CountUp from 'react-countup'

import styles from './styles.module.scss'

type ScoreboardProps = {
  value: number
  text: string
  animationDuration?: number
}

export const Scoreboard = ({
  value,
  text,
  animationDuration = 1.5
}: ScoreboardProps) => {
  return (
    <div className={styles.scoreboardContainer}>
      <CountUp
        className={styles.scoreboardNumber}
        end={value}
        decimals={value.toString().includes('.') ? 2 : 0}
        duration={animationDuration}
      />
      <span className={styles.scoreboardDescription}>{text}</span>
    </div>
  )
}
