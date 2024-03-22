'use client'
import { createContext, ReactNode, useState, useEffect } from 'react'
import { getLocalStorage } from '../utils/getLocalStorage'
import { setLocalStorage } from '../utils/setLocalStorage'
import { useLocale } from 'next-intl'
import { useGetLevelData } from '../hooks/useGetLevelData'
import { useGetLevelKey } from '../hooks/useGetLevelKey'
import type { LevelData, LevelKey } from '../typings/Level'
import type { Language } from '../typings/Zignix'

export type GameContextProps = {
  totalPoints?: number
  setTotalPoints?: (totalPoints: number) => void
  playerLevel?: number
  setPlayerLevel?: (playerLevel: number) => void
  levelKey?: LevelKey
  levelKeyLoading?: boolean
  matchPoints?: number
  setMatchPoints?: (matchPoints: number) => void
  chosenClues?: string[]
  setChosenClues?: (chosenClues: string[]) => void
  levelData?: LevelData
  levelDataLoading?: boolean
  secretWord?: string
  setSecretWord?: (secretWord: string) => void
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
  const [chosenClues, setChosenClues] = useState<string[]>([])
  const [secretWord, setSecretWord] = useState('')

  //  searching for language
  const locale = useLocale()

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
    const currentPlayerLevel = getLocalStorage('level')
    const currentTotalPoints = getLocalStorage('points')

    if (!currentPlayerLevel || !currentTotalPoints) {
      return
    }

    const parsedPlayerLevel = JSON.parse(currentPlayerLevel)
    const parsedTotalPoints = JSON.parse(currentTotalPoints)

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

  const resetGame = () => {
    setTotalPoints(0)
    setPlayerLevel(1)
    setMatchPoints(100)
    setChosenClues([])
    setSecretWord('')
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
        chosenClues,
        setChosenClues,
        secretWord,
        setSecretWord,
        levelData,
        levelDataLoading,
        levelKey,
        levelKeyLoading,
        resetGame
      }}
    >
      {children}
    </GameContext.Provider>
  )
}
