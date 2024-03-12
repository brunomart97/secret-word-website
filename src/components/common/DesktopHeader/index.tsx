import Link from 'next/link'
import { ZignixLogo } from '../../../assets/ZignixLogo'
import { idGenerator } from '../../../utils/idGenerator'
import { menuOptions } from '../../../constants/menuOptions'

import styles from './styles.module.scss'

export const DesktopHeader = () => {
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

        <div className={styles.optionsButtons}></div>
      </div>
    </header>
  )
}
