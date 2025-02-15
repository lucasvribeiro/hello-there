import { useState, useEffect } from 'react'
import {
  saveColor,
  getColor,
  getColorsHistory,
  clearColorsHistory
} from '../storage/asyncStorage'
import { Color, ColorsHistory } from '../types'
import { DEFAULT_COLOR } from '../constants'

const useColor = () => {
  const [color, setColor] = useState<Color>(DEFAULT_COLOR)
  const [colorsHistory, setColorsHistory] = useState<ColorsHistory>([])

  useEffect(() => {
    const fetchColorData = async () => {
      const savedColor = await getColor()
      const savedColorsHistory = await getColorsHistory()

      if (savedColor) setColor(savedColor)
      if (savedColorsHistory) setColorsHistory(savedColorsHistory)
    }

    fetchColorData()
  }, [])

  const changeColor = async (newColor: Color) => {
    try {
      await saveColor(color)
      setColor({ ...newColor })

      if (!colorsHistory.some((color) => color.hex === newColor.hex)) {
        const updatedHistory = await getColorsHistory()
        setColorsHistory([...updatedHistory])
      }
    } catch (error) {
      console.error('Error changing color:', error)
    }
  }

  const clearColors = async () => {
    try {
      await clearColorsHistory()
      setColorsHistory([])
      setColor(DEFAULT_COLOR)
    } catch (error) {
      console.error('Error clearing colors:', error)
    }
  }

  return {
    color,
    colorsHistory,
    changeColor,
    clearColors
  }
}

export default useColor
