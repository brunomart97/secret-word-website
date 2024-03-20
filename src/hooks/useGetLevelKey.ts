'use client'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { ZIGNIX_API_URL } from '../api/config'
import type { Language } from '../typings/Zignix'
import type { LevelData, LevelKey } from '../typings/Level'

export const useGetLevelKey = (
  language: Language,
  levelId: LevelData['id'],
  userResponse: string
) => {
  const [levelKey, setLevelKey] = useState<LevelKey>()
  const [loading, setLoading] = useState(false)

  const envNextPublicZignixApiKey = process.env.NEXT_PUBLIC_ZIGNIX_API_KEY ?? ''

  useEffect(() => {
    const request = async () => {
      try {
        setLoading(true)

        if (!userResponse) {
          return
        }

        const { data } = await axios.post<LevelKey>(
          `${ZIGNIX_API_URL}/level/getLevelKey`,
          {
            language,
            levelId,
            userResponse
          },
          {
            headers: {
              Authorization: `Bearer ${envNextPublicZignixApiKey}`
            }
          }
        )

        if (!data) {
          return
        }

        setLevelKey(data)
      } catch (error) {
        console.error('Error fetching levelKey:', error)
      } finally {
        setLoading(false)
      }
    }

    request()
  }, [language, levelId, userResponse])

  return { levelKey, loading }
}
