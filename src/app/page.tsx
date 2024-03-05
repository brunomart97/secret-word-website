'use client'
import { useLightTheme } from '../hooks/useLightTheme'

export default function Home() {
  const { isLightTheme, setTheme } = useLightTheme()

  return (
    <main>
      <button onClick={setTheme}>Tema</button>
    </main>
  )
}
