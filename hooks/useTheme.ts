import { useEffect, useState } from 'react'
import { useColorScheme } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { setTheme as setThemeAction } from '@/redux/reducers/user'

type Theme = 'light' | 'dark' | 'device'

const useTheme = () => {
  const dispatch = useDispatch()
  const colorScheme = useColorScheme() ?? 'light'
  const themeFromPreferences = useSelector((state: any) => state.user.preferences.theme)

  const initialValue =
    themeFromPreferences && themeFromPreferences !== 'device' ? themeFromPreferences : colorScheme

  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>(initialValue)

  const handleSetTheme = (newTheme: Theme) => {
    console.log(newTheme)
    dispatch(setThemeAction({ theme: newTheme }))
  }

  useEffect(() => {
    if (themeFromPreferences === 'device') {
      setCurrentTheme(colorScheme)
    } else {
      setCurrentTheme(themeFromPreferences)
    }
  }, [colorScheme, themeFromPreferences])

  return { theme: currentTheme, setTheme: handleSetTheme }
}

export default useTheme
