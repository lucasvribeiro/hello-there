import { useEffect, useRef } from 'react'
import { View, FlatList } from 'react-native'
import { setColor } from '@/redux/reducers/color'
import { useDispatch } from 'react-redux'
import * as Haptics from 'expo-haptics'

import { Color } from '@/types'
import ColorSquare from './ColorSquare'

interface ColorsListProps {
  data: Color[]
  enableScroll?: boolean
  highlightIndex?: number
}

const ColorsList = ({ data, enableScroll = true, highlightIndex }: ColorsListProps) => {
  const dispatch = useDispatch()

  const flatListRef = useRef<FlatList>(null)

  useEffect(() => {
    if (enableScroll) flatListRef.current?.scrollToEnd({ animated: true })
  }, [data])

  const handleColorPress = (item: Color, index: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    dispatch(setColor({ ...item, type: 'index', index }))
  }

  return (
    <View>
      <FlatList
        horizontal
        data={data}
        ref={flatListRef}
        keyExtractor={(item) => item.hex}
        contentContainerStyle={{ paddingVertical: 10 }}
        renderItem={({ item, index }) => (
          <View key={item.hex} style={{ marginHorizontal: 4 }}>
            <ColorSquare
              color={item.hex}
              onPress={() => handleColorPress(item, index)}
              withBorder={highlightIndex !== undefined && highlightIndex === index}
            />
          </View>
        )}
      />
    </View>
  )
}

export default ColorsList
