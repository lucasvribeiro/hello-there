import { useRef, useMemo, useCallback, memo, useEffect } from 'react'
import { View, FlatList } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import * as Haptics from 'expo-haptics'

import { Color } from '@/types'
import ColorSquare from './ColorSquare'
import { setColor } from '@/redux/reducers/color'

interface HistoryItemProps {
  item: Color
  index: number
  selected: boolean
}

const HistoryItem = memo(({ item, index, selected }: HistoryItemProps) => {
  const dispatch = useDispatch()
  const customMargin = useMemo(() => ({ marginHorizontal: 4 }), [])

  const handleColorPress = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    dispatch(setColor({ color: item, type: 'index', index }))
  }, [item])

  return (
    <ColorSquare
      key={item.hex}
      color={item.hex}
      selected={selected}
      customStyle={customMargin}
      onPress={handleColorPress}
    />
  )
})

const ColorsHistory = () => {
  const history = useSelector((state: any) => state.color.history)
  const currentIndex = useSelector((state: any) => state.color.currentIndex)
  const historyFlatListRef = useRef<FlatList>(null)

  const scrollToIndex = () => {
    historyFlatListRef.current?.scrollToIndex({
      animated: true,
      index: currentIndex,
      viewPosition: 0.5
    })
  }

  const scrollToEnd = () => {
    historyFlatListRef.current?.scrollToEnd({ animated: true })
  }

  useEffect(() => {
    scrollToIndex()
  }, [currentIndex])

  return (
    <View style={{ marginVertical: 5 }}>
      <FlatList
        horizontal
        data={history}
        ref={historyFlatListRef}
        keyExtractor={(item) => item.hex}
        onScrollToIndexFailed={scrollToEnd}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 10 }}
        renderItem={({ item, index }) => (
          <HistoryItem selected={currentIndex === index} item={item} index={index} />
        )}
      />
    </View>
  )
}

export default ColorsHistory
