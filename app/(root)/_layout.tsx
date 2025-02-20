import { Slot } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'

import Toast from '@/components/Toast'
import useTheme from '@/hooks/useTheme'

const AppLayout = () => {
  const theme = useTheme()

  return (
    <ThemeProvider value={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <StatusBar style="light" />
      <Toast />
      <Slot />
    </ThemeProvider>
  )
}

export default AppLayout
