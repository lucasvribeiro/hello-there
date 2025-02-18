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
  highlightColor?: string
}

const ColorsList = ({ data, enableScroll = true, highlightColor }: ColorsListProps) => {
  const dispatch = useDispatch()

  const flatListRef = useRef<FlatList>(null)

  useEffect(() => {
    if (enableScroll) flatListRef.current?.scrollToEnd({ animated: true })
  }, [data])

  const handleColorPress = (item: Color) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    dispatch(setColor(item))
  }

  return (
    <View>
      <FlatList
        horizontal
        data={data}
        ref={flatListRef}
        keyExtractor={(item) => item.hex}
        contentContainerStyle={{ paddingVertical: 10 }}
        renderItem={({ item }) => (
          <View style={{ marginHorizontal: 4 }}>
            <ColorSquare
              withBorder={item.hex === highlightColor}
              color={item.hex}
              onPress={() => handleColorPress(item)}
            />
          </View>
        )}
      />
    </View>
  )
}

export default ColorsList
