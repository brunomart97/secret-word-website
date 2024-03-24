import { useState, useEffect, useRef, ChangeEvent } from 'react'

import styles from './styles.module.scss'

type SecretWordInputItemProps = {
  letterKey: string
  nextLetterKey: string
  index: number
  inputFocusIndex: number
  setInputFocusIndex: (inputFocusIndex: number) => void
  inputSecretWord: string[]
  setInputSecretWord: (inputSecretWord: string[]) => void
}

export const SecretWordInputItem = ({
  letterKey,
  nextLetterKey,
  index,
  inputFocusIndex,
  setInputFocusIndex,
  inputSecretWord,
  setInputSecretWord
}: SecretWordInputItemProps) => {
  const [secretLetter, setSecretLetter] = useState(inputSecretWord[index])
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (index === inputFocusIndex && letterKey === '1') {
      inputRef?.current?.focus()
    }
  }, [inputSecretWord])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSecretLetter(event.target.value)
    const secretWordCopy = [...inputSecretWord]
    secretWordCopy[index] = event.target.value
    setInputSecretWord(secretWordCopy)
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
      onFocus={() => setSecretLetter('')}
      ref={inputRef}
    />
  )
}
