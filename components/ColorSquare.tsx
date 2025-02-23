import React, { memo, useEffect, useRef } from 'react'
import { StyleSheet, Pressable, ViewStyle, View, Animated } from 'react-native'

import { Colors } from '@/constants'
import useTheme from '@/hooks/useTheme'
import { DEFAULT_SHADOW } from '@/constants'

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
  const scaleValue = useRef(new Animated.Value(0)).current
  const selectedValue = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true
    }).start()
  }, [])

  useEffect(() => {
    Animated.timing(selectedValue, {
      toValue: selected ? 1 : 0,
      duration: 300,
      useNativeDriver: true
    }).start()
  }, [selected])

  const scaleSquare = {
    transform: [{ scale: scaleValue }]
  }

  const scaleSelected = {
    opacity: selectedValue,
    transform: [{ scale: selectedValue }]
  }

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
