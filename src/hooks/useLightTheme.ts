'use client'
import { useContext } from 'react'
import {
  LightThemeContext,
  LightThemeContextProps
} from '../contexts/LightThemeContext'

export const useLightTheme = (): LightThemeContextProps => {
  const context = useContext(LightThemeContext)

  return context
}
