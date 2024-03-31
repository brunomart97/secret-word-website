'use client'
import { useMemo } from 'react'
import { useGame } from '../../../hooks/useGame'
import { idGenerator } from '../../../utils/idGenerator'
import { useTranslations } from 'next-intl'
import { ClueCard } from '../../ui/ClueCard'
import { Skeleton } from '../../ui/Skeleton'
import { MainButton } from '../../ui/MainButton'

import styles from './styles.module.scss'

export const Clues = () => {
  const {
    levelData,
    levelDataLoading,
    chosenClues,
    setChosenClues,
    matchPoints,
    setMatchPoints,
    goToNextLevel,
    setLastLevelSkipped,
    totalPoints,
    setTotalPoints
  } = useGame()
  const i18n = useTranslations('i18n')
  const hasNoPoints = useMemo(
    () => typeof matchPoints !== 'undefined' && matchPoints <= 0,
    [matchPoints]
  )

  return (
    <section className={styles.cluesContainer}>
      <h2 className={styles.cluesTitle}>{i18n('game.cluesTitle')}</h2>
      <span className={styles.cluesDescription}>
        {i18n('game.cluesDescription')}
      </span>

      {hasNoPoints && (
        <div className={styles.cluesSkipLevel}>
          <MainButton
            text={i18n('game.skipLevel')}
            action={() => {
              goToNextLevel?.()
              setLastLevelSkipped?.(true)
              totalPoints && setTotalPoints?.(totalPoints - 20)
            }}
            color="var(--secondary)"
            backgroundColor="var(--splash)"
          />
          <span className={styles.cluesSkipLevelDescription}>
            {i18n('game.skipLevelDescription')}
          </span>
        </div>
      )}

      <div className={styles.cluesSubcontainer}>
        {levelDataLoading ? (
          <>
            {Array.from({ length: 16 }).map((_, index) => (
              <Skeleton width="100%" height="180px" key={idGenerator(index)} />
            ))}
          </>
        ) : (
          <>
            {levelData?.clues?.map((clue, index) => (
              <ClueCard
                clue={clue}
                number={index + 1}
                chosenClues={chosenClues}
                setChosenClues={setChosenClues}
                matchPoints={matchPoints}
                setMatchPoints={setMatchPoints}
                key={idGenerator(clue)}
              />
            ))}
          </>
        )}
      </div>
    </section>
  )
}
