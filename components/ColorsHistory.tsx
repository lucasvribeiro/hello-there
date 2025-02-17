import { useEffect, useRef } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import * as Haptics from 'expo-haptics'
import { setColor } from '@/redux/reducers/color'
import { useDispatch, useSelector } from 'react-redux'

import { Color } from '@/types'
import ColorSquare from './ColorSquare'

const ColorsHistory = () => {
  const dispatch = useDispatch()

  const flatListRef = useRef<FlatList>(null)
  const history = useSelector((state: any) => state.color.history)

  useEffect(() => {
    if (history.length > 0) {
      flatListRef.current?.scrollToEnd({ animated: true })
    }
  }, [history])

  const handleColorPress = (item: Color) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    dispatch(setColor(item))
  }

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={history}
        ref={flatListRef}
        keyExtractor={(item) => item.hex}
        contentContainerStyle={styles.flatListContainer}
        renderItem={({ item }) => (
          <ColorSquare color={item.hex} onPress={() => handleColorPress(item)} />
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
  flatListContainer: {
    paddingVertical: 15,
  }
})

export default ColorsHistory
