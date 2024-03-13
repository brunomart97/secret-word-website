import Link from 'next/link'
import { useState } from 'react'
import { ZignixLogo } from '../../../assets/ZignixLogo'
import { ThemeButton } from '../../ui/ThemeButton'
import { RiMenu3Line } from 'react-icons/ri'
import { CgClose } from 'react-icons/cg'
import { idGenerator } from '../../../utils/idGenerator'
import { menuOptions } from '../../../constants/menuOptions'

import styles from './styles.module.scss'

export const MobileHeader = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className={styles.header}>
      <div
        className={`${styles.headerSubcontainer} ${isOpen && styles.isOpen}`}
      >
        <Link href="/" className={styles.logoLink}>
          <ZignixLogo width={35} height={35} />
        </Link>

        <button
          className={styles.menuButton}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <CgClose color="var(--tertiary)" />
          ) : (
            <RiMenu3Line color="var(--tertiary)" />
          )}
        </button>
      </div>

      <div
        className={`${styles.menuOpenContainerLeft} ${isOpen && styles.isOpen}`}
      ></div>

      <div
        className={`${styles.menuOpenContainerRight} ${
          isOpen && styles.isOpen
        }`}
      >
        <nav className={styles.menuContainer}>
          <ul className={styles.menuSubcontainer}>
            {menuOptions.map(({ text, link }) => (
              <li className={styles.menuList} key={idGenerator(text)}>
                <Link
                  href={link}
                  onClick={() => setIsOpen(false)}
                  className={styles.menuLink}
                >
                  {text}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <ThemeButton />
      </div>
    </header>
  )
}
