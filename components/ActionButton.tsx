import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import React from 'react'

interface ActionButtonProps {
  icon: React.ReactNode
  backgroundColor?: string
  onPress: () => void
}

const ActionButton = ({
  onPress,
  icon,
  backgroundColor
}: ActionButtonProps) => {
  const styles = StyleSheet.create({
    button: {
      width: 40,
      height: 40,
      padding: 5,
      borderRadius: 1000,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: backgroundColor || '#FFFFFF33'
    }
  })

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.button}
      activeOpacity={0.8}
    >
      {icon}
    </TouchableOpacity>
  )
}

export default ActionButton
