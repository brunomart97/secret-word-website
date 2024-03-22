import { useState } from 'react'
import CountUp from 'react-countup'
import { useGame } from '../../../hooks/useGame'
import { useTranslations } from 'next-intl'
import { idGenerator } from '../../../utils/idGenerator'
import { MainButton } from '../MainButton'
import { Modal } from '../../section/Modal'

import styles from './styles.module.scss'

export const GameSummary = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const { playerLevel, totalPoints } = useGame()
  const i18n = useTranslations('i18n')

  const summaryList = [
    {
      value: playerLevel,
      text: i18n('game.playerLevelText')
    },
    {
      value: totalPoints,
      text: i18n('game.totalPointsText')
    }
  ]

  return (
    <>
      <div className={styles.gameSummaryContainer}>
        <div className={styles.gameSummarySubcontainer}>
          <div className={styles.gameSummaryLevel}>
            {summaryList.map(({ value, text }) => (
              <div
                className={styles.gameSummaryLevelBox}
                key={idGenerator(text)}
              >
                <h2 className={styles.gameSummaryLevelTitle}>{text}</h2>
                <CountUp
                  className={styles.gameSummaryLevelNumber}
                  end={value ?? 0}
                  decimals={playerLevel?.toString().includes('.') ? 2 : 0}
                  duration={1.5}
                />
              </div>
            ))}
          </div>

          <MainButton
            text={i18n('home.gameSummary.resetLevelButtonText')}
            action={() => setModalIsOpen(true)}
            color="var(--tertiary)"
            backgroundColor="var(--secondary)"
          />
        </div>
      </div>

      <Modal isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
        <div className={styles.modalContentContainer}>
          <div className={styles.modalContentTexts}>
            <p className={styles.modalContentTitle}>
              Tem certeza que deseja resetar seu jogo?
            </p>
            <p className={styles.modalContentSubtitle}>
              Essa ação fará com que você perca todo o seu progresso no jogo.
            </p>
          </div>

          <div className={styles.modalContentButtons}>
            <MainButton
              text="Sim"
              action={() => setModalIsOpen(false)}
              color="var(--tertiary)"
              backgroundColor="var(--secondary)"
            />
            <MainButton
              text="Não"
              action={() => setModalIsOpen(false)}
              color="var(--tertiary)"
              backgroundColor="var(--secondary)"
            />
          </div>
        </div>
      </Modal>
    </>
  )
}
