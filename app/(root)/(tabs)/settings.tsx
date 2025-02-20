import { View, Text } from 'react-native'
import RNPickerSelect from 'react-native-picker-select'

import ScreenWrapper from '@/components/ScreenWrapper'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import useTheme from '@/hooks/useTheme'
import { Theme } from '@/types'
import { Colors } from '@/constants/Colors'

const Settings = () => {
  const { theme, setTheme } = useTheme()

  const [selectedTheme, setSelectedTheme] = useState(theme as Theme)

  const handleThemeChange = (value: string) => {
    setSelectedTheme(value as Theme)
    setTheme(value as Theme)
  }

  return (
    <ScreenWrapper title="Settings">
      <View style={{ paddingVertical: 16, paddingHorizontal: 12 }}>
        <Text style={{ color: Colors[theme].text, fontSize: 16, fontFamily: 'Nunito-Bold' }}>
          Theme
        </Text>
        <RNPickerSelect
          value={selectedTheme}
          placeholder={{}}
          onValueChange={handleThemeChange}
          items={[
            { label: 'Device', value: 'device' },
            { label: 'Light', value: 'light' },
            { label: 'Dark', value: 'dark' }
          ]}
        />
      </View>
    </ScreenWrapper>
  )
}

export default Settings
