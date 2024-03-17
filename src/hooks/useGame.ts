'use client'
import { useContext } from 'react'
import { GameContext, GameContextProps } from '../contexts/GameContext'

export const useGame = (): GameContextProps => {
  const context = useContext(GameContext)

  return context
}
