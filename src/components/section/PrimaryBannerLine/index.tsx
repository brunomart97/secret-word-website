import { GameBanner } from '../../ui/GameBanner'

import styles from './styles.module.scss'

export const PrimaryBannerLine = () => {
  return (
    <section className={styles.primaryBannerLineContainer}>
      <GameBanner />
    </section>
  )
}
