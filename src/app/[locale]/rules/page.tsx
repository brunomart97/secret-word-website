import { getTranslations } from 'next-intl/server'
import type { Locale } from '../../../typings/Translate'

import styles from './styles.module.scss'

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: Locale }
}) {
  const i18n = await getTranslations({ locale, namespace: 'i18n' })

  return {
    title: i18n('metaData.pages.rules.title')
  }
}

export default function Rules() {
  return (
    <main className={styles.rulesContainer}>
      <h1>Rules</h1>
    </main>
  )
}
