import { useMemo } from 'react'
import { FlatList } from 'react-native'
import { useSelector } from 'react-redux'

import Empty from '@/components/Empty'
import ColorSquare from '@/components/ColorSquare'
import ScreenWrapper from '@/components/ScreenWrapper'

const History = () => {
  const history = useSelector((state: any) => state.color.history)

  const customMargin = useMemo(() => ({ marginRight: 6 }), [])

  return (
    <ScreenWrapper title="History">
      {history.length ? (
        <FlatList
          data={history}
          numColumns={4}
          keyExtractor={(item) => item.hex}
          contentContainerStyle={{ gap: 10 }}
          renderItem={({ item }) => (
            <ColorSquare
              width={72}
              height={72}
              padding={6}
              key={item.hex}
              color={item.hex}
              customStyle={customMargin}
            />
          )}
        />
      ) : (
        <Empty />
      )}
    </ScreenWrapper>
  )
}

export default History
