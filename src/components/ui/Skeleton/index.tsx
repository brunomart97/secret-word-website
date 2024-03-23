import styles from './styles.module.scss'

type SkeletonProps = {
  width: string
  height: string
  backgroundColor?: string
  shimmerColor?: string
  borderRadius?: string
  margin?: string
}

export const Skeleton = ({
  width,
  height,
  backgroundColor = 'var(--secondary)',
  shimmerColor = 'var(--primary)',
  borderRadius = '5px',
  margin
}: SkeletonProps) => {
  return (
    <div
      className={styles.skeleton}
      style={{
        width,
        height,
        backgroundColor,
        backgroundImage: `linear-gradient(to right, ${backgroundColor}, ${shimmerColor}, ${backgroundColor})`,
        borderRadius,
        margin
      }}
    />
  )
}
