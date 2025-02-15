import { useEffect, useRef } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import ColorSquare from './ColorSquare'
import { ColorsHistory as ColorsHistoryType } from '@/types'

type ColorsHistoryProps = {
  color: ColorsHistoryType[number]
  colorsHistory: ColorsHistoryType
  changeColor: (color: ColorsHistoryType[number]) => void
}

const ColorsHistory = ({
  color,
  colorsHistory,
  changeColor
}: ColorsHistoryProps) => {
  const flatListRef = useRef<FlatList>(null)

  useEffect(() => {
    if (colorsHistory.length > 0) {
      flatListRef.current?.scrollToEnd({ animated: true })
    }
  }, [colorsHistory])

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        ref={flatListRef}
        data={colorsHistory}
        keyExtractor={(item) => item.hex}
        contentContainerStyle={styles.flatListContainer}
        renderItem={({ item }) => (
          <ColorSquare
            selected={item.hex === color.hex}
            hex={item.hex}
            onPress={() => changeColor(item)}
          />
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 20,
    overflow: 'hidden',
  },
  flatListContainer: {
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
  }
})

export default ColorsHistory
