'use client'
import { useTranslations } from 'next-intl'
import { useLightTheme } from '../../../hooks/useLightTheme'
import { GoQuestion } from 'react-icons/go'

import styles from './styles.module.scss'

export const DoubtBanner = () => {
  const i18n = useTranslations('i18n')
  const { isLightTheme } = useLightTheme()

  return (
    <section
      className={styles.doubtBannerContainer}
      style={{
        backgroundImage: isLightTheme
          ? 'url("/images/greece-02.jpg")'
          : 'url("/images/greece-01.jpg")'
      }}
    >
      <a href="/rules" className={styles.doubtBannerLink}>
        <GoQuestion color="var(--tertiary)" />
        <h2 className={styles.doubtBannerTitle}>
          {i18n('home.doubtBanner.title')}
        </h2>
        <p className={styles.doubtBannerSubtitle}>
          {i18n('home.doubtBanner.subtitle')}
        </p>
      </a>
    </section>
  )
}
