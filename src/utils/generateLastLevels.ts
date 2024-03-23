export const generateLastLevels = (currentLevel: number) => {
  if (currentLevel <= 0) {
    return Array.from({ length: 10 }, () => 0)
  }

  return Array.from({ length: 10 }, (_, index) =>
    Math.max(0, currentLevel - 9 + index)
  )
}
