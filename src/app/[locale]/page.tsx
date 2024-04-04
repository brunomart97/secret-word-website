import { getTranslations } from 'next-intl/server'
import { PrimaryBannerLine } from '../../components/section/PrimaryBannerLine'
import { DoubtBanner } from '../../components/section/DoubtBanner'
import type { Metadata } from 'next'
import type { Locale } from '../../typings/Translate'

import styles from './styles.module.scss'

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: Locale }
}) {
  const i18n = await getTranslations({ locale, namespace: 'i18n' })

  return {
    title: i18n('metaData.pages.home.title')
  } as Metadata
}

export default function Home() {
  return (
    <main className={styles.homeContainer}>
      <PrimaryBannerLine />
      <DoubtBanner />
    </main>
  )
}
