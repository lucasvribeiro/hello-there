import { useState } from 'react'

export interface ToastType {
  message: string
  visible: boolean
  time?: number
  offset?: number
}

export interface ToastContextType {
  toast: ToastType
  setToast: (toast: ToastType) => void
  showToast: (message: string, time?: number, offset?: number) => void
}

const useToast = (): ToastContextType => {
  const [toast, setToast] = useState<ToastType>({ message: '', visible: false })

  const showToast = (message: string, time?: number, offset?: number) => {
    if (!toast.visible) {
      setToast({ message, visible: true, time, offset })
    }
  }

  return { toast, setToast, showToast }
}

export default useToast
