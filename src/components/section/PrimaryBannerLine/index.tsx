import { GameBanner } from '../../ui/GameBanner'
import { GameSummary } from '../../ui/GameSummary'

import styles from './styles.module.scss'

export const PrimaryBannerLine = () => {
  return (
    <section className={styles.primaryBannerLineContainer}>
      <GameBanner />
      <GameSummary />
    </section>
  )
}
