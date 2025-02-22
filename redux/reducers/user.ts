import { createSlice } from '@reduxjs/toolkit'

import { UserState } from '@/types'
import { Achievements } from '@/constants'

const initialState: UserState = {
  preferences: { theme: 'device' },
  achievements: []
}

const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setTheme(state, action) {
      state.preferences.theme = action.payload.theme
    },

    checkAchievement(state, action) {
      const achievement = Achievements.find((item) => item.trigger === action.payload.historySize)

      if (achievement) state.achievements.push({ achievement, shown: false })
    },

    setAchievementShown(state, action) {
      const achievement = state.achievements.find(
        (item) => item.achievement.trigger === action.payload.trigger
      )

      if (achievement) achievement.shown = true
    }
  }
})

export const { setTheme, checkAchievement, setAchievementShown } = userReducer.actions

export default userReducer.reducer
