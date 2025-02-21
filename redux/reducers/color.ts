import { createSlice } from '@reduxjs/toolkit'

import { getColor } from '@/utils/colorUtils'
import { LIMITS } from '@/constants'
import { ColorState, History, Favorites, HistoryAction } from '@/types'

const color = getColor()
const currentIndex: number = 0

const history: History = [color]
const favorites: Favorites = []

const initialState: ColorState = {
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
      const { color, type, index } = action.payload
      state.color = color

      switch (type as HistoryAction) {
        case 'new':
          state.history.push(color)
          state.currentIndex = state.history.length - 1
          break
        case 'prev':
          state.currentIndex = state.currentIndex - 1
          break
        case 'next':
          state.currentIndex = state.currentIndex + 1
          break
        case 'index':
          state.currentIndex = index
          break
      }
    },

    addToFavorites(state, action) {
      if (state.favorites.length >= LIMITS.MAX_FAVORITES) state.favorites.shift()

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
  addToFavorites,
  removeFromFavorites,
  clearHistory,
  clearFavorites,
  setCurrentIndex
} = colorReducer.actions

export default colorReducer.reducer
