import { getTranslations } from 'next-intl/server'
import { LevelCheck } from '../../../components/section/LevelCheck'
import type { Locale } from '../../../typings/Translate'

import styles from './styles.module.scss'

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: Locale }
}) {
  const i18n = await getTranslations({ locale, namespace: 'i18n' })

  return {
    title: i18n('metaData.pages.game.title')
  }
}

export default function Game() {
  return (
    <main className={styles.gameContainer}>
      <LevelCheck />
    </main>
  )
}
