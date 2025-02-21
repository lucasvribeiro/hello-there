import { useMemo } from 'react'
import { FlatList } from 'react-native'
import { useSelector } from 'react-redux'

import Achievement from '@/components/Achievement'
import ScreenWrapper from '@/components/ScreenWrapper'

const Achievements = () => {
  const achievements = useSelector((state: any) => state.user.achievements)

  const customMargin = useMemo(() => ({ marginRight: 8 }), [])

  return (
    <ScreenWrapper title="Achievements">
      <FlatList
        data={achievements}
        numColumns={3}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ gap: 10 }}
        renderItem={({ item }) => (
          <Achievement key={item.id} achievement={item} customStyle={customMargin} />
        )}
      />
    </ScreenWrapper>
  )
}

export default Achievements
