import { Scorebox } from '../../../components/section/Scorebox'
import { SecretWordInput } from '../../../components/section/SecretWordInput'
import { Clues } from '../../../components/section/Clues'

import styles from './styles.module.scss'

export default function Game() {
  return (
    <main className={styles.gameContainer}>
      <Scorebox />
      <SecretWordInput />
      <Clues />
    </main>
  )
}
