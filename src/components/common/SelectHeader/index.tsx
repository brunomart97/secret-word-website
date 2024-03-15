'use client'
import { useIsMobileScreen } from '../../../hooks/useIsMobileScreen'
import { MobileHeader } from '../MobileHeader'
import { DesktopHeader } from '../DesktopHeader'

export const SelectHeader = () => {
  const { isMobileScreen } = useIsMobileScreen(905)

  return isMobileScreen ? <MobileHeader /> : <DesktopHeader />
}
