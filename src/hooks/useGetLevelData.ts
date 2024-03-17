'use client'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { ZIGNIX_API_URL } from '../api/config'
import type { Language, LevelNumber } from '../typings/Zignix'
import type { LevelData } from '../typings/Level'

export const useGetLevelData = (
  language: Language,
  levelNumber: LevelNumber
) => {
  const [levelData, setLevelData] = useState<LevelData>()
  const [loading, setLoading] = useState(false)

  const envApiAppKey = process.env.NEXT_PUBLIC_ZIGNIX_APP_KEY ?? ''

  useEffect(() => {
    const request = async () => {
      try {
        setLoading(true)

        const { data } = await axios.post<LevelData>(
          `${ZIGNIX_API_URL}/level/getLevelData`,
          {
            language,
            levelNumber
          },
          {
            headers: {
              Authorization: `Bearer ${envApiAppKey}`
            }
          }
        )

        if (!data) {
          return
        }

        setLevelData(data)
      } catch (error) {
        console.error('Error fetching levelData:', error)
      } finally {
        setLoading(false)
      }
    }

    request()
  }, [language, levelNumber])

  return { levelData, loading }
}
