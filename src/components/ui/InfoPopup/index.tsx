import { useEffect, useState } from 'react'
import { useGame } from '../../../hooks/useGame'

import styles from './styles.module.scss'

export const InfoPopup = () => {
  const [visible, setVisible] = useState(false)
  const { infoPopupData, setInfoPopupData } = useGame()

  useEffect(() => {
    if (!infoPopupData?.text) {
      return
    }

    setVisible(true)

    const timeout = setTimeout(() => {
      setVisible(false)
      setInfoPopupData?.({ text: '', seconds: 0, type: '' })
    }, infoPopupData.seconds * 1000)

    return () => clearTimeout(timeout)
  }, [infoPopupData])

  if (!visible || !infoPopupData?.text) {
    return null
  }

  return (
    <button
      className={styles.infoPopupContainer}
      onClick={() => setVisible(false)}
      style={{
        backgroundColor:
          infoPopupData.type === 'success' ? 'var(--success)' : 'var(--fail)'
      }}
    >
      <span className={styles.infoPopupText}>{infoPopupData.text}</span>
    </button>
  )
}
