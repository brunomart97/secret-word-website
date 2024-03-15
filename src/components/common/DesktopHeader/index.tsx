'use client'
import Link from 'next/link'
import { ZignixLogo } from '../../../assets/ZignixLogo'
import { ThemeButton } from '../../ui/ThemeButton'
import { idGenerator } from '../../../utils/idGenerator'
import { useTranslations } from 'next-intl'

import styles from './styles.module.scss'

export const DesktopHeader = () => {
  const i18n = useTranslations('i18n')

  const menuOptions = [
    {
      text: i18n('commom.menuOptions.home.text'),
      link: i18n('commom.menuOptions.home.link')
    },
    {
      text: i18n('commom.menuOptions.game.text'),
      link: i18n('commom.menuOptions.game.link')
    },
    {
      text: i18n('commom.menuOptions.about.text'),
      link: i18n('commom.menuOptions.about.link')
    }
  ]

  return (
    <header className={styles.header}>
      <div className={styles.headerSubcontainer}>
        <div className={styles.logoContainer}>
          <Link href="/" className={styles.logoLink}>
            <ZignixLogo width={50} height={50} />
          </Link>
        </div>

        <nav className={styles.menuContainer}>
          <ul className={styles.menuSubcontainer}>
            {menuOptions.map(({ text, link }) => (
              <li className={styles.menuList} key={idGenerator(text)}>
                <Link href={link} className={styles.menuLink}>
                  {text}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.optionsButtons}>
          <ThemeButton />
        </div>
      </div>
    </header>
  )
}
