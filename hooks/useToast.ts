import { useState } from 'react'

import { Toast, ToastContext } from '@/types'

const useToast = (): ToastContext => {
  const [toast, setToast] = useState<Toast>({ message: '', visible: false })

  const showToast = (message: string, time?: number, offset?: number) => {
    if (!toast.visible) {
      setToast({ message, visible: true, time, offset })
    }
  }

  const hideToast = () => {
    setToast({ message: '', visible: false })
  }

  return { toast, showToast, hideToast }
}

export default useToast
