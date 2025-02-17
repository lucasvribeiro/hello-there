import { useState, useEffect } from 'react'

import { getColor } from '@/utils/colors'
import { STORAGE_KEYS } from '@/constants'
import { ColorContext } from '@/types'
import { getFromStorage, saveToStorage } from '@/storage/asyncStorage'
import { useDispatch, useSelector } from 'react-redux'
import { setColor } from '@/redux/reducers/color'

const useColor = (): ColorContext => {
  const color = useSelector((state: any) => state.color)
  const dispatch = useDispatch()

  useEffect(() => {
    const setColorInitialState = async () => {
      const colorFromStorage = await getFromStorage(STORAGE_KEYS.COLOR)

      dispatch(setColor(colorFromStorage || getColor()))
    }

    setColorInitialState()
  }, [])

  useEffect(() => {
    const setColorInStorage = async () => {
      const colorInStorage = await getFromStorage(STORAGE_KEYS.COLOR)

      if (!colorInStorage || (color && color.hex !== colorInStorage?.hex)) {
        await saveToStorage(STORAGE_KEYS.COLOR, color)
      }
    }

    setColorInStorage()
  }, [color])

  return { color, setColor }
}

export default useColor
