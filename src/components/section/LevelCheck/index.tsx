'use client'
import { useGame } from '../../../hooks/useGame'
import { Scorebox } from '../../../components/section/Scorebox'
import { SecretWordInput } from '../../../components/section/SecretWordInput'
import { Clues } from '../../../components/section/Clues'
import { GameOver } from '../../../components/section/GameOver'

import styles from './styles.module.scss'

export const LevelCheck = () => {
  const { gameIsOver } = useGame()

  return (
    <section className={styles.levelCheckContainer}>
      {gameIsOver ? (
        <GameOver />
      ) : (
        <>
          <Scorebox />
          <SecretWordInput />
          <Clues />
        </>
      )}
    </section>
  )
}
