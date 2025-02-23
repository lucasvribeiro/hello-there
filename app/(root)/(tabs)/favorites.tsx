import React, { memo, useCallback, useMemo } from 'react'
import { FlatList } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { Color } from '@/types'
import Empty from '@/components/Empty'
import ColorSquare from '@/components/ColorSquare'
import ScreenWrapper from '@/components/ScreenWrapper'
import { removeFromFavorites } from '@/redux/reducers/color'

const FavoriteItem = memo(({ item }: { item: Color }) => {
  const dispatch = useDispatch()
  const customMargin = useMemo(() => ({ margin: 5 }), [])

  const handlePress = useCallback(() => {
    dispatch(removeFromFavorites(item))
  }, [item])

  return (
    <ColorSquare
      width={72}
      height={72}
      padding={6}
      key={item.hex}
      color={item.hex}
      onPress={handlePress}
      customStyle={customMargin}
    />
  )
})

const Favorites = () => {
  const favorites = useSelector((state: any) => state.color.favorites)

  return (
    <ScreenWrapper title="Favorites">
      {favorites.length ? (
        <FlatList
          numColumns={4}
          data={favorites}
          keyExtractor={(item) => item.hex}
          contentContainerStyle={{ gap: 4 }}
          renderItem={({ item }) => <FavoriteItem item={item} />}
        />
      ) : (
        <Empty />
      )}
    </ScreenWrapper>
  )
}

export default Favorites
