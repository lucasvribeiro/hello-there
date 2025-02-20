import React from 'react'
import { Slot } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import Toast from '@/components/Toast'
import { DarkTheme } from '@react-navigation/native'
import { ThemeProvider } from '@react-navigation/native'
import { DefaultTheme } from '@react-navigation/native'
import useTheme from '@/hooks/useTheme'

const AppLayout = () => {
  const { theme } = useTheme()

  return (
    <ThemeProvider value={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <Toast />
      <StatusBar style="light" />
      <Slot />
    </ThemeProvider>
  )
}

export default AppLayout
