import { getTranslations } from 'next-intl/server'
import { Scorebox } from '../../../components/section/Scorebox'
import { SecretWordInput } from '../../../components/section/SecretWordInput'
import { Clues } from '../../../components/section/Clues'
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
      <Scorebox />
      <SecretWordInput />
      <Clues />
    </main>
  )
}
