import AsyncStorage from '@react-native-async-storage/async-storage'
import { DEFAULT_COLOR } from '../constants'
import { Color, ColorsHistory } from '../types'

const STORAGE_KEYS = {
  COLOR: 'color',
  COLORS_HISTORY: 'colorsHistory'
}

export const saveColor = async (color: Color) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.COLOR, JSON.stringify(color))
    const colorsHistory: ColorsHistory = await getColorsHistory()

    if (!colorsHistory.some((c: Color) => c.hex === color.hex)) {
      colorsHistory.push(color)
      await AsyncStorage.setItem(
        STORAGE_KEYS.COLORS_HISTORY,
        JSON.stringify(colorsHistory)
      )
    }
  } catch (error) {
    console.error('[ERROR] saveColor:', error)
  }
}

export const getColor = async () => {
  try {
    const color = await AsyncStorage.getItem(STORAGE_KEYS.COLOR)

    return color ? JSON.parse(color) : DEFAULT_COLOR
  } catch (error) {
    console.error('[ERROR] getColor:', error)
    return DEFAULT_COLOR
  }
}

export const getColorsHistory = async () => {
  try {
    const colorsHistory = await AsyncStorage.getItem(
      STORAGE_KEYS.COLORS_HISTORY
    )

    return colorsHistory ? JSON.parse(colorsHistory) : []
  } catch (error) {
    console.error('[ERROR] getColorsHistory:', error)
    return []
  }
}

export const clearColorsHistory = async () => {
  try {
    await AsyncStorage.clear()
  } catch (error) {
    console.error('[ERROR] clearColorsHistory:', error)
  }
}
