'use client'
import { createContext, ReactNode, useState, useEffect } from 'react'
import { getLocalStorage } from '../utils/getLocalStorage'
import { setLocalStorage } from '../utils/setLocalStorage'
import { useLocale } from 'next-intl'
import { useGetLevelData } from '../hooks/useGetLevelData'
import type { LevelData } from '../typings/Level'
import type { Language } from '../typings/Zignix'

export type GameContextProps = {
  playerLevel?: number
  setPlayerLevel?: (playerLevel: number) => void
  levelData?: LevelData
  levelDataLoading?: boolean
  matchPoints?: number
  setMatchPoints?: (matchPoints: number) => void
}

type GameProviderProps = {
  children: ReactNode
}

export const GameContext = createContext({} as GameContextProps)

export const GameContextProvider = ({ children }: GameProviderProps) => {
  const [playerLevel, setPlayerLevel] = useState(1)
  const [matchPoints, setMatchPoints] = useState(100)

  //  searching for language
  const locale = useLocale()

  // searching for match data
  const { levelData, loading: levelDataLoading } = useGetLevelData(
    locale as Language,
    playerLevel
  )

  // checking the player's level initially
  useEffect(() => {
    const currentPlayerLevel = getLocalStorage('level')

    if (!currentPlayerLevel || JSON.parse(currentPlayerLevel) === 0) {
      setPlayerLevel(1)
      setLocalStorage('level', JSON.stringify(1))
      return
    }

    setPlayerLevel(JSON.parse(currentPlayerLevel))
  }, [])

  // setting the player level when he passes the level
  useEffect(() => {
    setLocalStorage('level', JSON.stringify(playerLevel))
  }, [playerLevel])

  return (
    <GameContext.Provider
      value={{
        playerLevel,
        setPlayerLevel,
        matchPoints,
        setMatchPoints,
        levelData,
        levelDataLoading
      }}
    >
      {children}
    </GameContext.Provider>
  )
}
