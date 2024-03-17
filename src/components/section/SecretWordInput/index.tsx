'use client'
import { useState } from 'react'
import { createSharedPathnamesNavigation } from 'next-intl/navigation'
import { locales } from '../../../constants/translate'
import { useGame } from '../../../hooks/useGame'
import { MainButton } from '../../ui/MainButton'
import { SecretWordInputItem } from '../../ui/SecretWordInputItem'
import { idGenerator } from '../../../utils/idGenerator'

import styles from './styles.module.scss'

export const SecretWordInput = () => {
  const [inputFocusIndex, setInputFocusIndex] = useState(0)
  const [secretWord, setSecretWord] = useState<string[]>([])
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

  const handleClearInput = () => {
    setSecretWord([])
    setInputFocusIndex(0)
  }

  return (
    <section className={styles.secretWordInputContainer}>
      <h1 className={styles.secretWordInputTitle}>Palavra secreta:</h1>
      <div className={styles.secretWordInputSubcontainer}>
        {encryptedKeyFormated.map((letterKey, index) => (
          <SecretWordInputItem
            letterKey={letterKey}
            nextLetterKey={encryptedKeyFormated[index + 1]}
            index={index}
            inputFocusIndex={inputFocusIndex}
            setInputFocusIndex={setInputFocusIndex}
            secretWord={secretWord}
            setSecretWord={setSecretWord}
            key={idGenerator(index)}
          />
        ))}
      </div>
      <div className={styles.secretWordInputButtonsContainer}>
        <MainButton
          text="Limpar"
          action={handleClearInput}
          color="var(--tertiary)"
          backgroundColor="var(--secondary)"
        />
        <MainButton text="Verificar palavra" action={() => null} />
      </div>
    </section>
  )
}
