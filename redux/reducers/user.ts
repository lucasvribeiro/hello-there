import { ACHIEVEMENTS } from '@/constants'
import { Achievement, Theme } from '@/types'
import { createSlice } from '@reduxjs/toolkit'

interface UserState {
  preferences: {
    theme: Theme
  }
  achievements: Achievement[]
}

const initialState: UserState = {
  preferences: {
    theme: 'device'
  },
  achievements: ACHIEVEMENTS.map((achievement) => ({
    ...achievement,
    unlocked: false
  }))
}

const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setTheme(state, action) {
      console.log(action.payload)
      state.preferences.theme = action.payload.theme
    },
    achievementUnlocked(state, action) {
      const achievement = state.achievements.find(
        (achievement) => achievement.id === action.payload.id
      )
      if (achievement) {
        achievement.unlocked = true
      }
    }
  }
})

export const { setTheme, achievementUnlocked } = userReducer.actions

export default userReducer.reducer
