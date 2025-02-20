import { MAXIMUM_FAVORITES_LENGTH, MAXIMUM_HISTORY_LENGTH } from '@/constants'
import { Color } from '@/types'
import { getColor } from '@/utils/colors'
import { createSlice } from '@reduxjs/toolkit'

const color: Color = getColor()
const history: Color[] = [color]
const favorites: Color[] = []
const currentIndex = 0

const initialState = {
  color,
  history,
  favorites,
  currentIndex
}

const colorReducer = createSlice({
  name: 'color',
  initialState,
  reducers: {
    setColor(state, action) {
      const { type, ...newColor } = action.payload
      state.color = newColor

      if (type === 'new') {
        if (state.history.length >= MAXIMUM_HISTORY_LENGTH) state.history.shift()
        state.history.push(action.payload)
        state.currentIndex = state.history.length - 1
      } else if (type === 'prev') {
        state.currentIndex = state.currentIndex - 1
      } else if (type === 'next') {
        state.currentIndex = state.currentIndex + 1
      } else if (type === 'index') {
        state.currentIndex = action.payload.index
      }
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
    },
    setCurrentIndex(state, action) {
      state.currentIndex = action.payload
    }
  }
})

export const {
  setColor,
  clearHistory,
  addToFavorites,
  removeFromFavorites,
  clearFavorites,
  setCurrentIndex
} = colorReducer.actions

export default colorReducer.reducer
