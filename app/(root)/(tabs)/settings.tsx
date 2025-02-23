import { View, Text, StyleSheet } from 'react-native'
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
        <View style={styles.section}>
          <Text style={[styles.title, { color: Colors[theme].text }]}>Theme</Text>

          <SegmentedControl data={THEMES} selected={themePreference} onChange={changeTheme} />
        </View>

        <View style={styles.section}>
          <Text style={[styles.title, { color: Colors[theme].text }]}>Instructions:</Text>

          <Text style={[styles.item, { color: Colors[theme].text }]}>
            ➡️ <Text style={{ fontFamily: 'Nunito-Bold' }}>Swipe right:</Text> previous color
          </Text>
          <Text style={[styles.item, { color: Colors[theme].text }]}>
            ⬅️ <Text style={{ fontFamily: 'Nunito-Bold' }}>Swipe left:</Text> next color
          </Text>
          <Text style={[styles.item, { color: Colors[theme].text }]}>
            1️⃣ <Text style={{ fontFamily: 'Nunito-Bold' }}>Single tap:</Text> next color
          </Text>
          <Text style={[styles.item, { color: Colors[theme].text }]}>
            2️⃣ <Text style={{ fontFamily: 'Nunito-Bold' }}>Double tap:</Text> Add/remove from
            favorites
          </Text>
          <Text style={[styles.item, { color: Colors[theme].text }]}>
            #️⃣ <Text style={{ fontFamily: 'Nunito-Bold' }}>Tap on color hex to copy it!</Text>
          </Text>
        </View>
      </View>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 20
  },
  item: {
    marginBottom: 4,
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Nunito-Regular'
  },
  title: {
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
    marginBottom: 12
  }
})

export default Settings
