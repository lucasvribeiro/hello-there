import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import useTheme from '@/hooks/useTheme'
import { Colors } from '@/constants'

const Empty = () => {
  const theme = useTheme()

  return (
    <View>
      <Text style={[styles.text, { color: Colors[theme].text }]}>No data found.</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontFamily: 'Nunito-Regular'
  }
})

export default Empty
