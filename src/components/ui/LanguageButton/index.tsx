'use client'
import { useMemo, useState } from 'react'
import { createSharedPathnamesNavigation } from 'next-intl/navigation'
import { useLocale } from 'next-intl'
import { locales, defaultLocale } from '../../../constants/translate'
import { IoLanguage } from 'react-icons/io5'
import { MdOutlineKeyboardArrowUp } from 'react-icons/md'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import type { Locale } from '../../../typings/Translate'

import styles from './styles.module.scss'

export const LanguageButton = () => {
  const locale = useLocale()

  const [selectedLanguage, setSelectedLanguage] = useState<Locale>(
    locale as Locale
  )
  const [isOpen, setIsOpen] = useState(false)

  const { usePathname, useRouter } = createSharedPathnamesNavigation({
    locales
  })
  const pathname = usePathname()
  const router = useRouter()

  const localeOptions = [
    {
      key: 'en',
      value: 'English'
    },
    {
      key: 'pt',
      value: 'Português'
    },
    {
      key: 'es',
      value: 'Español'
    }
  ]

  const selectedLocaleName = useMemo(
    () =>
      localeOptions.find((locale) => locale.key === selectedLanguage)?.value ??
      localeOptions.find((locale) => locale.key === defaultLocale)?.value,
    [selectedLanguage]
  ) as Locale

  return (
    <div className={styles.languageButtonContainer}>
      <button
        className={styles.languageButton}
        onClick={() => setIsOpen(!isOpen)}
      >
        <IoLanguage color="var(--tertiary)" />
        {selectedLocaleName}
        {isOpen ? (
          <MdOutlineKeyboardArrowUp color="var(--tertiary)" />
        ) : (
          <MdOutlineKeyboardArrowDown color="var(--tertiary)" />
        )}
      </button>

      {isOpen && (
        <div className={styles.languageButtonDropdown}>
          {localeOptions.map(({ key, value }) => (
            <button
              className={styles.languageButtonDropdownOption}
              onClick={() => {
                router.push(pathname, { locale: key })
                setSelectedLanguage(key as Locale)
              }}
              key={key}
              disabled={selectedLocaleName === value}
            >
              {value}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
