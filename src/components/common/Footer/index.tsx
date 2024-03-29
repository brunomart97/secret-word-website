'use client'
import { ZignixLogo } from '../../../assets/ZignixLogo'
import { useTranslations } from 'next-intl'

import styles from './styles.module.scss'

export const Footer = () => {
  const i18n = useTranslations('i18n')

  return (
    <footer className={styles.footer}>
      <div className={styles.footerSubcontainer}>
        <div className={styles.footerTop}>
          <ZignixLogo width={90} height={90} color="var(--secondary)" />
        </div>

        <div className={styles.footerBottom}>
          <span className={styles.footerRights}>
            <strong>© Zignix. </strong>
            {i18n('commom.footer.copyrightText')}
          </span>
        </div>
      </div>
    </footer>
  )
}
