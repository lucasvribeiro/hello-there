import { useMemo } from 'react'
import { FlatList } from 'react-native'
import { useSelector } from 'react-redux'

import { Achievements as AchievementsList } from '@/constants'
import Achievement from '@/components/Achievement'
import ScreenWrapper from '@/components/ScreenWrapper'

const Achievements = () => {
  const customMargin = useMemo(() => ({ margin: 6 }), [])

  return (
    <ScreenWrapper title="Achievements">
      <FlatList
        data={AchievementsList}
        numColumns={3}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Achievement key={item.id} achievement={item} customStyle={customMargin} />
        )}
      />
    </ScreenWrapper>
  )
}

export default Achievements
