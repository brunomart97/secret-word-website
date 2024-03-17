'use client'
import { createContext, ReactNode, useState, useEffect } from 'react'

export type LightThemeContextProps = {
  isLightTheme: boolean
  setTheme: () => void
}

type LightThemeProviderProps = {
  children: ReactNode
}

export const LightThemeContext = createContext({} as LightThemeContextProps)

export const LightThemeContextProvider = ({
  children
}: LightThemeProviderProps) => {
  const [isLightTheme, setIsLightTheme] = useState(false)

  useEffect(() => {
    const verifyLocalStorageTheme = () => {
      const localStorageThemeResult =
        window?.localStorage?.getItem('isLightTheme') === 'true' ? true : false

      setIsLightTheme(localStorageThemeResult)

      const html = document.querySelector('html')

      if (isLightTheme) {
        html?.classList.add('lightTheme')
      } else {
        html?.classList.remove('lightTheme')
      }
    }

    verifyLocalStorageTheme()
  }, [isLightTheme])

  const setTheme = () => {
    window?.localStorage?.setItem('isLightTheme', JSON.stringify(!isLightTheme))

    setIsLightTheme(!isLightTheme)
  }

  return (
    <LightThemeContext.Provider
      value={{
        isLightTheme,
        setTheme
      }}
    >
      {children}
    </LightThemeContext.Provider>
  )
}
