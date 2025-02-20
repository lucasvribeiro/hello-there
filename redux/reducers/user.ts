import { createSlice } from '@reduxjs/toolkit'

import { UserState, Theme } from '@/types'
import { Achievements } from '@/constants'

const initialState: UserState = {
  preferences: { theme: 'device' },
  achievements: Achievements.map((achievement) => ({
    ...achievement,
    unlocked: false
  }))
}

const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setTheme(state, action) {
      state.preferences.theme = action.payload.theme
    },

    achievementUnlocked(state, action) {
      const achievement = state.achievements.find((item) => item.id === action.payload.id)

      if (achievement) achievement.unlocked = true
    }
  }
})

export const { setTheme, achievementUnlocked } = userReducer.actions

export default userReducer.reducer
