'use client'
import { createContext, ReactNode, useState, useEffect } from 'react'
import { getLocalStorage } from '../utils/getLocalStorage'
import { setLocalStorage } from '../utils/setLocalStorage'
import { useLocale, useTranslations } from 'next-intl'
import { useGetLevelData } from '../hooks/useGetLevelData'
import { useGetLevelKey } from '../hooks/useGetLevelKey'
import type { LevelData, LevelKey } from '../typings/Level'
import type { Language } from '../typings/Zignix'
import type { InfoPopupData } from '../typings/Popup'

export type GameContextProps = {
  totalPoints?: number
  setTotalPoints?: (totalPoints: number) => void
  playerLevel?: number
  setPlayerLevel?: (playerLevel: number) => void
  levelKey?: LevelKey
  levelKeyLoading?: boolean
  matchPoints?: number
  setMatchPoints?: (matchPoints: number) => void
  lastPoints?: number[]
  chosenClues?: string[]
  setChosenClues?: (chosenClues: string[]) => void
  levelData?: LevelData
  levelDataLoading?: boolean
  secretWord?: string
  setSecretWord?: (secretWord: string) => void
  infoPopupData?: InfoPopupData
  setInfoPopupData?: (infoPopupData: InfoPopupData) => void
  resetGame?: () => void
}

type GameProviderProps = {
  children: ReactNode
}

export const GameContext = createContext({} as GameContextProps)

export const GameContextProvider = ({ children }: GameProviderProps) => {
  const [totalPoints, setTotalPoints] = useState(0)
  const [playerLevel, setPlayerLevel] = useState(1)
  const [matchPoints, setMatchPoints] = useState(100)
  const [lastPoints, setLastPoints] = useState(
    Array.from({ length: 10 }, () => 0)
  )
  const [chosenClues, setChosenClues] = useState<string[]>([])
  const [secretWord, setSecretWord] = useState('')
  const [infoPopupData, setInfoPopupData] = useState<InfoPopupData>({
    text: '',
    seconds: 0,
    type: ''
  })

  //  searching for language
  const locale = useLocale()

  //  searching for translations
  const i18n = useTranslations('i18n')

  // searching for match data
  const { levelData, loading: levelDataLoading } = useGetLevelData(
    locale as Language,
    playerLevel
  )

  // checking the secret word
  const { levelKey, loading: levelKeyLoading } = useGetLevelKey(
    locale as Language,
    levelData?.id ?? '',
    secretWord
  )

  useEffect(() => {
    if (!levelKey) {
      return
    }

    if (levelKey.keyWasDiscovered && levelKey.key !== 'unacceptable') {
      // record the last score
      const lastPointsCopy = [...lastPoints]
      lastPointsCopy.shift()
      lastPointsCopy.push(matchPoints)
      setLastPoints(lastPointsCopy)

      // cleaning up the states
      setTotalPoints(totalPoints + matchPoints)
      setMatchPoints(100)
      setSecretWord('')
      setChosenClues([])
      setPlayerLevel(playerLevel + 1)
      return
    }
  }, [levelKey])

  // checking the player's level and total points initially
  useEffect(() => {
    const storedPlayerLevel = getLocalStorage('level')
    const storedTotalPoints = getLocalStorage('points')

    if (!storedPlayerLevel || !storedTotalPoints) {
      return
    }

    const parsedPlayerLevel = JSON.parse(storedPlayerLevel)
    const parsedTotalPoints = JSON.parse(storedTotalPoints)

    if (parsedPlayerLevel > playerLevel) {
      setPlayerLevel(parsedPlayerLevel)
    }

    if (parsedTotalPoints > totalPoints) {
      setTotalPoints(parsedTotalPoints)
    }
  }, [])

  // setting the player level when he passes the level
  useEffect(() => {
    setLocalStorage('level', JSON.stringify(playerLevel))
  }, [playerLevel])

  // setting the player's point total when he earns points
  useEffect(() => {
    setLocalStorage('points', JSON.stringify(totalPoints))
  }, [totalPoints])

  // check if the matchpoint was negative and set it to zero
  useEffect(() => {
    if (matchPoints < 0) {
      setMatchPoints(0)
    }
  }, [matchPoints])

  // handle with last 10 points
  useEffect(() => {
    const storedLastPoints = getLocalStorage('lastPoints')

    if (!storedLastPoints) {
      setLocalStorage('lastPoints', JSON.stringify(lastPoints))
      return
    }

    const parsedLastPoints = JSON.parse(storedLastPoints)
    setLastPoints(parsedLastPoints as number[])
  }, [])

  useEffect(() => {
    const storedPlayerLevel = getLocalStorage('level')

    if (!storedPlayerLevel) {
      return
    }

    const parsedPlayerLevel = JSON.parse(storedPlayerLevel)

    if (parsedPlayerLevel > 1) {
      setLocalStorage('lastPoints', JSON.stringify(lastPoints))
    }
  }, [lastPoints])

  // message in popup
  useEffect(() => {
    if (levelKey && !levelKey.keyWasDiscovered) {
      setInfoPopupData({
        text: i18n('game.popupWrongSecretWord'),
        seconds: 10,
        type: 'fail'
      })
    }
  }, [levelKey])

  // reset game function
  const resetGame = () => {
    setTotalPoints(0)
    setPlayerLevel(1)
    setMatchPoints(100)
    setChosenClues([])
    setSecretWord('')
    setLastPoints(Array.from({ length: 10 }, () => 0))
    setLocalStorage(
      'lastPoints',
      JSON.stringify(Array.from({ length: 10 }, () => 0))
    )
    setInfoPopupData({
      text: '',
      seconds: 0,
      type: ''
    })
  }

  return (
    <GameContext.Provider
      value={{
        totalPoints,
        setTotalPoints,
        playerLevel,
        setPlayerLevel,
        matchPoints,
        setMatchPoints,
        lastPoints,
        chosenClues,
        setChosenClues,
        secretWord,
        setSecretWord,
        levelData,
        levelDataLoading,
        levelKey,
        levelKeyLoading,
        infoPopupData,
        setInfoPopupData,
        resetGame
      }}
    >
      {children}
    </GameContext.Provider>
  )
}
