import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import ColorSquare from '@/components/ColorSquare'
import { Color } from '@/types'
import { removeFromFavorites } from '@/redux/reducers/color'
import ScreenWrapper from '@/components/ScreenWrapper'
import Empty from '@/components/Empty'

const History = () => {
  const dispatch = useDispatch()
  const history = useSelector((state: any) => state.color.history)

  return (
    <ScreenWrapper title="History" scrollable>
      {history.length > 0 ? (
        <View style={styles.colorsContainer}>
          {history.map((item: Color) => (
            <View key={item.hex} style={{ padding: 5 }}>
              <ColorSquare width={72} height={72} padding={6} color={item.hex} />
            </View>
          ))}
        </View>
      ) : (
        <Empty />
      )}
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: 'transparent'
  },
  favoritesHeader: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  favoritesHeaderTitle: {
    fontSize: 28,
    fontFamily: 'Nunito-Black',
    color: '#FFFFFF'
  },
  colorsContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10
  }
})

export default History
