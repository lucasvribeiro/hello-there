import { View, StyleSheet, ActivityIndicator } from 'react-native'
import React from 'react'

const Loading = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#FFFFFF" />
    </View>
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#222222EE'
  }
})

export default Loading
