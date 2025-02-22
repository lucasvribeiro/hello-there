import React, { memo, useEffect } from 'react'
import { StyleSheet, Pressable, ViewStyle, View } from 'react-native'
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated'

import { Colors } from '@/constants'
import { DEFAULT_SHADOW } from '@/constants'
import useTheme from '@/hooks/useTheme'

type ColorSquareProps = {
  color: string
  width?: number
  height?: number
  padding?: number
  selected?: boolean
  customStyle?: ViewStyle
  onPress?: () => void
}

const ColorSquare = ({
  color,
  onPress,
  width = 60,
  height = 60,
  padding = 6,
  selected,
  customStyle
}: ColorSquareProps) => {
  const theme = useTheme()
  const scaleValue = useSharedValue(0)
  const selectedValue = useSharedValue(0)

  scaleValue.value = withTiming(1, { duration: 300 })

  const scaleSquare = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scaleValue.value }]
    }
  })

  const scaleSelected = useAnimatedStyle(() => {
    return {
      opacity: selectedValue.value,
      transform: [{ scale: selectedValue.value }]
    }
  })

  useEffect(() => {
    selectedValue.value = withTiming(selected ? 1 : 0, { duration: 300 })
  }, [selected])

  return (
    <Animated.View style={scaleSquare}>
      <Pressable
        onPress={onPress}
        style={[
          styles.pressable,
          {
            width,
            height,
            padding,
            backgroundColor: Colors[theme].background,
            borderColor: Colors[theme].textLight,
            ...customStyle
          }
        ]}
      >
        <View style={[styles.square, { backgroundColor: `#${color}` }]} />

        <Animated.View
          style={[styles.selected, scaleSelected, { backgroundColor: `#${color}99` }]}
        />
      </Pressable>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  pressable: {
    position: 'relative',
    borderRadius: 12,
    ...DEFAULT_SHADOW
  },
  square: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    ...DEFAULT_SHADOW
  },
  selected: {
    height: 4,
    bottom: -10,
    width: '35%',
    borderRadius: 10,
    marginHorizontal: 'auto'
  }
})

export default memo(ColorSquare)
