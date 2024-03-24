'use client'
import { useState, useMemo } from 'react'
import CountUp from 'react-countup'
import { Line } from 'react-chartjs-2'
import { LuInfo } from 'react-icons/lu'
import { useGame } from '../../../hooks/useGame'
import { useTranslations } from 'next-intl'
import { idGenerator } from '../../../utils/idGenerator'
import { generateLastLevels } from '../../../utils/generateLastLevels'
import { MainButton } from '../MainButton'
import { Modal } from '../../section/Modal'
import 'chart.js/auto'

import styles from './styles.module.scss'

export const GameSummary = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const { playerLevel, totalPoints, resetGame, lastPoints } = useGame()
  const i18n = useTranslations('i18n')

  const chartData = useMemo(
    () => ({
      labels: generateLastLevels(playerLevel ? playerLevel - 1 : 0),
      datasets: [
        {
          label: '',
          data: lastPoints,
          fill: true,
          backgroundColor: 'transparent',
          borderColor: '#d4445c'
        }
      ]
    }),
    [lastPoints, playerLevel]
  )

  const chartOptions = {
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        display: false
      },
      y: {
        display: false
      }
    }
  }

  const gameInfo = [
    {
      text: i18n('game.playerLevelText'),
      value: playerLevel
    },
    {
      text: i18n('game.totalPointsText'),
      value: totalPoints
    }
  ]

  return (
    <>
      <div className={styles.gameSummaryContainer}>
        <div className={styles.gameSummarySubcontainer}>
          <h2 className={styles.gameSummaryTitle}>
            {i18n('home.gameSummary.summaryTitle')}
          </h2>
          <div className={styles.gameSummaryInfo}>
            {gameInfo.map(({ text, value }) => (
              <div
                className={styles.gameSummaryInfoOption}
                key={idGenerator(text)}
              >
                <h3 className={styles.gameSummaryInfoOptionTitle}>{text}</h3>
                <CountUp
                  className={styles.gameSummaryInfoOptionValue}
                  end={value ?? 0}
                  decimals={value?.toString().includes('.') ? 2 : 0}
                  duration={1.5}
                />
              </div>
            ))}
          </div>

          <div className={styles.gameSummaryChart}>
            <Line data={chartData} options={chartOptions} />
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
              {i18n('home.gameSummary.resetModalTitle')}
            </p>
            <p className={styles.modalContentSubtitle}>
              <LuInfo color="var(--tertiary)" />
              {i18n('home.gameSummary.resetModalSubtitle')}
            </p>
          </div>

          <div className={styles.modalContentButtons}>
            <MainButton
              text={i18n('home.gameSummary.resetModalButtonReset')}
              action={() => {
                resetGame?.()
                setModalIsOpen(false)
              }}
              color="var(--secondary)"
              backgroundColor="var(--splash)"
            />
            <MainButton
              text={i18n('home.gameSummary.resetModalButtonCancel')}
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
