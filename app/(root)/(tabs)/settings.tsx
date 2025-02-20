import { View, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import useTheme from '@/hooks/useTheme'
import { Colors, THEMES } from '@/constants'
import { Theme, ThemePreference } from '@/types'
import { setTheme } from '@/redux/reducers/user'
import ScreenWrapper from '@/components/ScreenWrapper'
import SegmentedControl from '@/components/SegmentedControl'

const Settings = () => {
  const dispatch = useDispatch()
  const theme: Theme = useTheme()
  const themePreference: ThemePreference = useSelector((state: any) => state.user.preferences.theme)

  const changeTheme = (value: string) => {
    dispatch(setTheme({ theme: value as Theme }))
  }

  return (
    <ScreenWrapper title="Settings">
      <View style={{ paddingVertical: 16, paddingHorizontal: 12 }}>
        <Text style={{ color: Colors[theme].text, fontSize: 16, fontFamily: 'Nunito-Bold' }}>
          Theme
        </Text>

        <SegmentedControl data={THEMES} selected={themePreference} onChange={changeTheme} />
      </View>
    </ScreenWrapper>
  )
}

export default Settings
