import CountUp from 'react-countup'

import styles from './styles.module.scss'

type ScoreboardProps = {
  value: number
  text: string
}

export const Scoreboard = ({ value, text }: ScoreboardProps) => {
  return (
    <div className={styles.scoreboardContainer}>
      <CountUp
        className={styles.scoreboardNumber}
        end={value}
        decimals={value.toString().includes('.') ? 2 : 0}
        duration={1.5}
      />
      <span className={styles.scoreboardDescription}>{text}</span>
    </div>
  )
}
