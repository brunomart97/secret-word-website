'use client'
import { PrimaryBannerLine } from '../../components/section/PrimaryBannerLine'

import styles from './styles.module.scss'

export default function Home() {
  return (
    <main className={styles.homeContainer}>
      <PrimaryBannerLine />
    </main>
  )
}
