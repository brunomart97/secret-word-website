'use client'
import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { useGame } from '../../../hooks/useGame'
import { MainButton } from '../../ui/MainButton'
import { SecretWordInputItem } from '../../ui/SecretWordInputItem'
import { idGenerator } from '../../../utils/idGenerator'

import styles from './styles.module.scss'

export const SecretWordInput = () => {
  const [inputFocusIndex, setInputFocusIndex] = useState(0)
  const [inputSecretWord, setInputSecretWord] = useState<string[]>([])
  const {
    levelData,
    levelDataLoading,
    setSecretWord,
    playerLevel,
    levelKeyLoading
  } = useGame()
  const i18n = useTranslations('i18n')

  // clearing the inputs when you pass a level
  useEffect(() => {
    setInputSecretWord([])
  }, [playerLevel])

  const verifySecretWord = () => {
    if (inputSecretWord.length > 0) {
      // converting the letters typed in the input into a string
      const formatedSecretWord = inputSecretWord
        .map((letter) => (letter ? letter : ' '))
        .join('')

      setSecretWord?.(formatedSecretWord)
    } else {
      setSecretWord?.('')
    }
  }

  if (levelDataLoading) {
    return <h2>Carregando...</h2>
  }

  if (!levelData) {
    return null
  }

  const keyMoldFormated = levelData.keyMold.split('')

  const handleClearInput = () => {
    setInputSecretWord([])
    setInputFocusIndex(0)
  }

  return (
    <section className={styles.secretWordInputContainer}>
      <h2 className={styles.secretWordInputTitle}>{i18n('game.inputTitle')}</h2>
      <div className={styles.secretWordInputSubcontainer}>
        {keyMoldFormated.map((letterKey, index) => (
          <SecretWordInputItem
            letterKey={letterKey}
            nextLetterKey={keyMoldFormated[index + 1]}
            index={index}
            inputFocusIndex={inputFocusIndex}
            setInputFocusIndex={setInputFocusIndex}
            inputSecretWord={inputSecretWord}
            setInputSecretWord={setInputSecretWord}
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
          text={
            levelKeyLoading
              ? i18n('game.inputVerifyButtonLoadingText')
              : i18n('game.inputVerifyButtonText')
          }
          action={verifySecretWord}
        />
      </div>
    </section>
  )
}
