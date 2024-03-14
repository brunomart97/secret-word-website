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

  useEffect(() => {
    const request = async () => {
      try {
        setLoading(true)

        const { data } = await axios.post<LevelData>(
          `${ZIGNIX_API_URL}/level/getLevelData`,
          {
            language,
            levelNumber
          }
        )

        setLevelData(data)
      } catch {
        throw new Error('Fail in levelData request')
      } finally {
        setLoading(false)
      }
    }

    request()
  }, [])

  return { levelData, loading }
}
