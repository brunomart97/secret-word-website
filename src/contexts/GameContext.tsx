'use client'
import { createContext, ReactNode, useState, useEffect } from 'react'
import { getLocalStorage } from '../utils/getLocalStorage'
import { setLocalStorage } from '../utils/setLocalStorage'
import type { LevelData } from '../typings/Level'

export type GameContextProps = {}

type GameProviderProps = {
  children: ReactNode
}

export const GameContext = createContext({} as GameContextProps)

export function GameContextProvider({ children }: GameProviderProps) {
  const [playerLevel, setPlayerLevel] = useState(0)
  const [levelData, setLevelData] = useState<LevelData>()
  const [matchPoints, setMatchPoints] = useState(100)

  // checking player level
  useEffect(() => {
    const currentPlayerLevel = getLocalStorage('level')

    if (!currentPlayerLevel) {
      setPlayerLevel(1)
      setLocalStorage('level', JSON.stringify(1))
      return
    }

    setPlayerLevel(JSON.parse(currentPlayerLevel))
  }, [])

  return <GameContext.Provider value={{}}>{children}</GameContext.Provider>
}
