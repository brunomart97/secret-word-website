import styles from './styles.module.scss'

type MainButtonProps = {
  text: string
  action: () => void
  color?: string
  backgroundColor?: string
}

export const MainButton = ({
  text,
  action,
  color = 'var(--secondary)',
  backgroundColor = 'var(--splash)'
}: MainButtonProps) => {
  return (
    <button
      className={styles.mainButton}
      onClick={action}
      style={{ color, backgroundColor }}
    >
      {text}
    </button>
  )
}
