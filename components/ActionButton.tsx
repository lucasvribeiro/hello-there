import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import React from 'react'

interface ActionButtonProps {
  icon: React.ReactNode
  onPress: () => void
}

const ActionButton = ({ onPress, icon }: ActionButtonProps) => {
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

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    padding: 5,
    borderRadius: 1000,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF11',
  }
})

export default ActionButton
