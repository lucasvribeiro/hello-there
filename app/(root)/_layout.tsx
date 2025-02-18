import React from 'react'
import { Slot } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import Toast from '@/components/Toast'
import useToast from '@/hooks/useToast'

const AppLayout = () => {
  return (
    <>
      <Toast />
      <StatusBar style="light" />
      <Slot />
    </>
  )
}

export default AppLayout
