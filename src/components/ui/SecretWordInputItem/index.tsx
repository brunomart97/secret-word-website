import {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  ChangeEvent,
  FocusEvent
} from 'react'

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
  const [targetValue, setTargetValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (index === inputFocusIndex && letterKey === '1') {
      inputRef?.current?.focus()
    }
  }, [inputSecretWord])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const lastLetterTyped =
      event.target.value.split('').find((letter) => letter !== targetValue) ??
      targetValue
    setSecretLetter(lastLetterTyped)

    const secretWordCopy = [...inputSecretWord]
    secretWordCopy[index] = lastLetterTyped
    setInputSecretWord(secretWordCopy)
    setInputFocusIndex(nextLetterKey === '1' ? index + 1 : index + 2)
  }

  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    setSecretLetter(event.target.value)
    setTargetValue(event.target.value)
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
      onFocus={handleFocus}
      ref={inputRef}
    />
  )
}
