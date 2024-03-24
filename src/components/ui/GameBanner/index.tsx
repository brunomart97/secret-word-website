'use client'
import { useTranslations } from 'next-intl'
import { createSharedPathnamesNavigation } from 'next-intl/navigation'
import { locales } from '../../../constants/translate'
import { MainButton } from '../MainButton'

import styles from './styles.module.scss'

export const GameBanner = () => {
  const { useRouter } = createSharedPathnamesNavigation({
    locales
  })
  const i18n = useTranslations('i18n')
  const router = useRouter()

  return (
    <div className={styles.gameBannerContainer}>
      <div className={styles.gameBannerSubcontainer}>
        <div className={styles.gameBannerLeftContent}>
          <h2>{i18n('home.gameBanner.title')}</h2>
          <h3>{i18n('home.gameBanner.subtitle')}</h3>
          <p>{i18n('home.gameBanner.text')}</p>
          <MainButton
            text={i18n('home.gameBanner.buttonText')}
            action={() => router.push('/game')}
          />
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
