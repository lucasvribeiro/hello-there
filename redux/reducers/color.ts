import { MAXIMUM_FAVORITES_LENGTH, MAXIMUM_HISTORY_LENGTH } from '@/constants'
import { Color } from '@/types'
import { getColor } from '@/utils/colors'
import { createSlice } from '@reduxjs/toolkit'

const color: Color = getColor()
const history: Color[] = [color]
const favorites: Color[] = []

const initialState = {
  color,
  history,
  favorites
}

const colorReducer = createSlice({
  name: 'color',
  initialState,
  reducers: {
    setColor(state, action) {
      state.color.hex = action.payload.hex
      state.color.luminance = action.payload.luminance
    },
    addToHistory(state, action) {
      if (state.history.length >= MAXIMUM_HISTORY_LENGTH) state.history.shift()

      state.history.push(action.payload)
    },
    addToFavorites(state, action) {
      if (state.favorites.length >= MAXIMUM_FAVORITES_LENGTH) state.favorites.shift()

      state.favorites.push(action.payload)
    },
    removeFromFavorites(state, action) {
      state.favorites = state.favorites.filter((color) => color.hex !== action.payload.hex)
    },
    clearHistory(state) {
      state.history = []
    },
    clearFavorites(state) {
      state.favorites = []
    }
  }
})

export const {
  setColor,
  addToHistory,
  clearHistory,
  addToFavorites,
  removeFromFavorites,
  clearFavorites
} = colorReducer.actions

export default colorReducer.reducer
