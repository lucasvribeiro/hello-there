import { useColorScheme } from 'react-native'
import { useSelector } from 'react-redux'

import { Theme, ThemePreference } from '@/types'

const useTheme = (): Theme => {
  const colorScheme = useColorScheme()
  const themePreference: ThemePreference = useSelector((state: any) => state.user.preferences.theme)

  if (themePreference === 'device') {
    return colorScheme || 'light'
  }

  return themePreference as Theme
}

export default useTheme
