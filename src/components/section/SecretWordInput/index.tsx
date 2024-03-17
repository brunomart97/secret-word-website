'use client'
import { createSharedPathnamesNavigation } from 'next-intl/navigation'
import { locales } from '../../../constants/translate'
import { useGame } from '../../../hooks/useGame'

import styles from './styles.module.scss'

export const SecretWordInput = () => {
  const { levelData, levelDataLoading } = useGame()
  const { useRouter } = createSharedPathnamesNavigation({
    locales
  })
  const router = useRouter()

  if (levelDataLoading) {
    return <h2>Carregando...</h2>
  }

  if (!levelData) {
    return null
    // router.push('/')
  }

  const encryptedKeyFormated = levelData.encryptedKey.split('')

  return (
    <section className={styles.secretWordInputContainer}>
      <h1 className={styles.secretWordInputTitle}>Palavra secreta:</h1>
      <div className={styles.secretWordInputSubcontainer}>
        {encryptedKeyFormated.map((letterKey) =>
          letterKey === '1' ? (
            <input className={styles.secretWordInputItem} type="text" />
          ) : (
            <div className={styles.secretWordInputSpace} />
          )
        )}
      </div>
    </section>
  )
}
