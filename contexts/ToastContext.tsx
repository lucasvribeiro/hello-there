import { createContext, useContext } from 'react'

import { ToastContext as ToastContextType } from '@/types'
import useToast from '@/hooks/useToast'

const ToastContext = createContext<ToastContextType | undefined>(undefined)

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const { toast, showToast, hideToast } = useToast()

  return (
    <ToastContext.Provider value={{ toast, showToast, hideToast }}>{children}</ToastContext.Provider>
  )
}

const useToastContext = (): ToastContextType => {
  const context = useContext(ToastContext)

  if (!context) throw new Error('useToast must be used within a ToastProvider')

  return context
}

export { ToastProvider, useToastContext }
