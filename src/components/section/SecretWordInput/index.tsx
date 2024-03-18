'use client'
import { useState } from 'react'
import { createSharedPathnamesNavigation } from 'next-intl/navigation'
import { useTranslations } from 'next-intl'
import { locales } from '../../../constants/translate'
import { useGame } from '../../../hooks/useGame'
import { MainButton } from '../../ui/MainButton'
import { MatchPoint } from '../../ui/MatchPoint'
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
  const i18n = useTranslations('i18n')
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
      <MatchPoint />
      <h2 className={styles.secretWordInputTitle}>{i18n('game.inputTitle')}</h2>
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
          text={i18n('game.inputClearButtonText')}
          action={handleClearInput}
          color="var(--tertiary)"
          backgroundColor="var(--secondary)"
        />
        <MainButton
          text={i18n('game.inputVerifyButtonText')}
          action={() => null}
        />
      </div>
    </section>
  )
}
