import { useTranslations } from 'next-intl'

import styles from './styles.module.scss'

export const GameBanner = () => {
  const i18n = useTranslations('i18n')

  return (
    <div className={styles.gameBannerContainer}>
      <div className={styles.gameBannerSubcontainer}>
        <div className={styles.gameBannerLeftContent}>
          <h2>{i18n('home.gameBanner.title')}</h2>
          <h3>{i18n('home.gameBanner.subtitle')}</h3>
          <p>{i18n('home.gameBanner.text')}</p>
        </div>

        <div className={styles.gameBannerRightContent}>
          <img
            src="/images/statue-01.png"
            alt="Game banner"
            className={styles.gameBannerImage}
          />
        </div>
      </div>
    </div>
  )
}
