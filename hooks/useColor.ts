import { useState, useEffect } from 'react'
import {
  saveColor,
  getColor,
  getColorsHistory,
  clearColorsHistory,
  getFavorites,
  updateFavorites
} from '../storage/asyncStorage'
import { Color, ColorsHistory, Favorites } from '../types'
import { DEFAULT_COLOR } from '../constants'

const useColor = () => {
  const [color, setColor] = useState<Color>(DEFAULT_COLOR)
  const [favorites, setFavorites] = useState<Favorites>([])
  const [colorsHistory, setColorsHistory] = useState<ColorsHistory>([])

  useEffect(() => {
    const fetchColorData = async () => {
      const savedColor = await getColor()
      const savedColorsHistory = await getColorsHistory()
      const savedFavorites = await getFavorites()

      if (savedColor) setColor(savedColor)
      if (savedColorsHistory) setColorsHistory(savedColorsHistory)
      if (savedFavorites) setFavorites(savedFavorites)
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

  const addFavorite = async (newColor: Color) => {
    try {
      await updateFavorites([...favorites, newColor])
      setFavorites([...favorites, newColor])
    } catch (error) {
      console.error('Error adding favorite:', error)
    }
  }

  const removeFavorite = async (colorToRemove: Color) => {
    try {
      const updatedFavorites = favorites.filter(
        (color) => color.hex !== colorToRemove.hex
      )

      await updateFavorites(updatedFavorites)
      setFavorites(updatedFavorites)
    } catch (error) {
      console.error('Error removing favorite:', error)
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
    favorites,
    changeColor,
    addFavorite,
    removeFavorite,
    clearColors
  }
}

export default useColor
