import { useMemo } from 'react'
import { ZignixLogo } from '../../../assets/ZignixLogo'

import styles from './styles.module.scss'

type ClueCardProps = {
  word: string
  number: number
  chosenClues?: string[]
  setChosenClues?: (chosenClues: string[]) => void
  matchPoints?: number
  setMatchPoints?: (matchPoints: number) => void
}

export const ClueCard = ({
  word,
  number,
  chosenClues,
  setChosenClues,
  matchPoints,
  setMatchPoints
}: ClueCardProps) => {
  const isChosen = useMemo(
    () => !!chosenClues?.find((clue) => clue === word),
    [chosenClues]
  )

  const handleChooseClue = () => {
    chosenClues && setChosenClues?.([...chosenClues, word])
    matchPoints && matchPoints > 0 && setMatchPoints?.(matchPoints - 6.5)
  }

  if (isChosen) {
    return (
      <button className={styles.chosenClueCardContainer}>
        <span className={styles.chosenClueCardNumber}>{word}</span>
      </button>
    )
  }

  return (
    <button className={styles.clueCardContainer} onClick={handleChooseClue}>
      <ZignixLogo width={80} height={80} color="var(--primary)" />
      <span className={styles.clueCardNumber}>
        {number < 10 && '0'}
        {number}
      </span>
    </button>
  )
}
