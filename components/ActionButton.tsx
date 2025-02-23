import {
  StyleSheet,
  Pressable,
  Animated,
  Text,
  TextStyle,
  ViewStyle,
  StyleProp
} from 'react-native'
import React, { useRef } from 'react'
import * as Haptics from 'expo-haptics'

interface ActionButtonProps {
  text?: string
  icon?: React.ReactNode
  textStyle?: StyleProp<TextStyle>
  containerStyle?: StyleProp<ViewStyle>
  onPress: () => void
}

const ActionButton = ({ icon, text, textStyle, containerStyle, onPress }: ActionButtonProps) => {
  const scaleValue = useRef(new Animated.Value(1)).current

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)

    onPress()
  }

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.8,
      speed: 50,
      useNativeDriver: true
    }).start()
  }

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      speed: 50,
      useNativeDriver: true
    }).start()
  }

  return (
    <Pressable onPress={handlePress} onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <Animated.View
        style={[
          styles.button,
          containerStyle,
          {
            transform: [{ scale: scaleValue }]
          }
        ]}
      >
        {icon}

        {text && <Text style={[styles.textStyles, textStyle]}>{text}</Text>}
      </Animated.View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 8,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF44'
  },
  textStyles: {
    fontSize: 28,
    color: '#FFFFFF',
    fontFamily: 'Nunito-ExtraBold'
  }
})

export default ActionButton
