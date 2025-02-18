import useToast, { ToastContextType } from '@/hooks/useToast'
import { createContext, useContext } from 'react'

const ToastContext = createContext<ToastContextType | undefined>(undefined)

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const { toast, setToast, showToast } = useToast()

  return (
    <ToastContext.Provider value={{ toast, setToast, showToast }}>{children}</ToastContext.Provider>
  )
}

const useToastContext = (): ToastContextType => {
  const context = useContext(ToastContext)

  if (!context) throw new Error('useToast must be used within a ToastProvider')

  return context
}

export { ToastProvider, useToastContext }
