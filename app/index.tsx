import { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Share, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import useColor from '@/hooks/useColor'
import ColorText from '@/components/ColorText'
import Ionicons from '@expo/vector-icons/Ionicons'
import ActionButton from '@/components/ActionButton'
import ColorsHistory from '@/components/ColorsHistory'
import { getLuminance, getHexColor, generateRandomValues } from '@/utils/colors'
import ColorCard from '@/components/ColorCard'

export default function Index() {
  const { color, colorsHistory, changeColor, clearColors } = useColor()

  // useEffect(() => {
  //   clearColors()
  // }, [])

  return (
    <View style={{ flex: 1 }}>
      <StatusBar animated style="light" backgroundColor={`${color.hex}EE`} />

      <SafeAreaView style={{ position: 'relative', flex: 1 }}>
        <ColorCard
          color={color}
          colorsHistory={colorsHistory}
          changeColor={changeColor}
        />

        {colorsHistory.length ? (
          <ColorsHistory
            color={color}
            colorsHistory={colorsHistory}
            changeColor={changeColor}
          />
        ) : null}
      </SafeAreaView>
    </View>
  )
}
