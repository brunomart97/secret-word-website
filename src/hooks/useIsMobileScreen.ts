'use client'
import { useState, useEffect } from 'react'

export const useIsMobileScreen = (mobileScreenSize: number) => {
  const [isMobileScreen, setIsMobileScreen] = useState(false)

  const detectScreenSize = () => {
    setIsMobileScreen(window.innerWidth <= mobileScreenSize)
  }

  useEffect(() => {
    detectScreenSize()
  }, [detectScreenSize])

  useEffect(() => {
    window.addEventListener('resize', detectScreenSize)

    return () => window.removeEventListener('scroll', detectScreenSize)
  }, [])

  return { isMobileScreen }
}
