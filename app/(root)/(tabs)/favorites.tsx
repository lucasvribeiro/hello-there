import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import ColorSquare from '@/components/ColorSquare'
import { Color } from '@/types'
import { removeFromFavorites } from '@/redux/reducers/color'
import ScreenWrapper from '@/components/ScreenWrapper'
import Empty from '@/components/Empty'

const Favorites = () => {
  const dispatch = useDispatch()
  const favorites = useSelector((state: any) => state.color.favorites)

  const handlePress = (color: Color) => {
    dispatch(removeFromFavorites(color))
  }

  return (
    <ScreenWrapper title="Favorites" scrollable>
      {favorites.length > 0 ? (
        <View style={styles.colorsContainer}>
          {favorites.map((item: Color) => (
            <View key={item.hex} style={{ padding: 5 }}>
              <ColorSquare
                width={72}
                height={72}
                padding={6}
                color={item.hex}
                onPress={() => handlePress(item)}
              />
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

export default Favorites
