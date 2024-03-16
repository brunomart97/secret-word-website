import styles from './styles.module.scss'

export const GameBanner = () => {
  return (
    <div className={styles.gameBannerContainer}>
      <div className={styles.gameBannerSubcontainer}>
        <div className={styles.gameBannerLeftContent}>
          <h2>Zignix</h2>
          <h3>Vai encarar o desafio?</h3>
          <p>
            Um jogo feito para testar sua inteligência. Descubra a palavra
            secreta com o mínimo de pistas possíveis.
          </p>
        </div>

        <div className={styles.gameBannerRightContent}>
          <img
            src="/images/statue-01.png"
            alt="Game banner"
            className={styles.gameBannerImage}
          />
        </div>
      </div>
    </div>
  )
}
