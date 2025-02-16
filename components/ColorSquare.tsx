import { TouchableOpacity, StyleSheet, Animated } from 'react-native'
import React, { useEffect, useState } from 'react'

type ColorSquareProps = {
  hex: string | undefined
  selected: boolean
  onPress: () => void
}

const ColorSquare = ({ hex, selected, onPress }: ColorSquareProps) => {
  const scaleValue = useState(new Animated.Value(0))[0]

  useEffect(() => {
    Animated.spring(scaleValue, {
      toValue: 1,
      tension: 100,
      friction: 7,
      useNativeDriver: true
    }).start()
  }, [])

  const styles = StyleSheet.create({
    square: {
      width: 54,
      height: 54,
      marginVertical: 3,
      marginHorizontal: 4,
      borderRadius: 15,
      backgroundColor: hex,
      borderWidth: 3,
      borderColor: '#FFFFFF',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    }
  })

  return (
    <TouchableOpacity onPress={onPress}>
      <Animated.View
        style={[styles.square, { transform: [{ scale: scaleValue }] }]}
      />
    </TouchableOpacity>
  )
}

export default ColorSquare
