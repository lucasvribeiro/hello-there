import { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import useColor from '@/hooks/useColor'
import ColorsHistory from '@/components/ColorsHistory'
import ColorCard from '@/components/ColorCard'
import Toast from '@/components/Toast'
import { ACHIEVEMENTS } from '@/constants'

export default function Index() {
  const {
    color,
    colorsHistory,
    changeColor,
    clearColors,
    favorites,
    addFavorite,
    removeFavorite
  } = useColor()

  const [showToast, setShowToast] = useState(false)
  const [achievement, setAchievement] = useState<
    (typeof ACHIEVEMENTS)[number] | null
  >(null)
  useEffect(() => {
    const achievement = ACHIEVEMENTS.find(
      (achievement) => achievement.trigger === colorsHistory.length
    )
    if (achievement) {
      setAchievement(achievement)
      setShowToast(true)
    }
  }, [colorsHistory])

  useEffect(() => {
    clearColors()
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar animated style="dark" />

      <Toast
        visible={showToast}
        message={`${
          achievement ? `${achievement.icon} ${achievement.title}` : ''
        }`}
        onHide={() => setShowToast(false)}
      />

      <SafeAreaView style={{ position: 'relative', flex: 1 }}>
        <ColorCard
          color={color}
          colorsHistory={colorsHistory}
          changeColor={changeColor}
          favorites={favorites}
          addFavorite={addFavorite}
          removeFavorite={removeFavorite}
        />

        <ColorsHistory
          color={color}
          colorsHistory={colorsHistory}
          changeColor={changeColor}
        />
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#222222',
    justifyContent: 'center'
  }
})
