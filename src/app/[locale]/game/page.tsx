import { SecretWordInput } from '../../../components/section/SecretWordInput'

import styles from './styles.module.scss'

export default function Game() {
  return (
    <main className={styles.gameContainer}>
      <SecretWordInput />
    </main>
  )
}
