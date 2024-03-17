import { useState, useEffect, useRef, ChangeEvent } from 'react'

import styles from './styles.module.scss'

type SecretWordInputItemProps = {
  letterKey: string
  nextLetterKey: string
  index: number
  inputFocusIndex: number
  setInputFocusIndex: (inputFocusIndex: number) => void
  secretWord: string[]
  setSecretWord: (secretWord: string[]) => void
}

export const SecretWordInputItem = ({
  letterKey,
  nextLetterKey,
  index,
  inputFocusIndex,
  setInputFocusIndex,
  secretWord,
  setSecretWord
}: SecretWordInputItemProps) => {
  const [secretLetter, setSecretLetter] = useState(secretWord[index])
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (index === inputFocusIndex && letterKey === '1') {
      inputRef?.current?.focus()
    }
  }, [secretWord])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSecretLetter(event.target.value)
    const secretWordCopy = [...secretWord]
    secretWordCopy[index] = event.target.value
    setSecretWord(secretWordCopy)
    setInputFocusIndex(nextLetterKey === '1' ? index + 1 : index + 2)
  }

  if (letterKey === '0') {
    return <div className={styles.secretWordInputSpace} />
  }

  return (
    <input
      className={styles.secretWordInputItem}
      type="text"
      value={secretLetter}
      onChange={handleChange}
      ref={inputRef}
    />
  )
}
