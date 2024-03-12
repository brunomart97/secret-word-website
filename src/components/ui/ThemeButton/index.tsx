import { useLightTheme } from '../../../hooks/useLightTheme'
import { FiSun } from 'react-icons/fi'
import { RiMoonLine } from 'react-icons/ri'

import styles from './styles.module.scss'

export const ThemeButton = () => {
  const { isLightTheme, setTheme } = useLightTheme()

  return (
    <button className={styles.themeButton} onClick={() => setTheme()}>
      {isLightTheme ? (
        <RiMoonLine color="var(--tertiary)" />
      ) : (
        <FiSun color="var(--tertiary)" />
      )}
    </button>
  )
}
