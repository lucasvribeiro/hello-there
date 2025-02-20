import { View, StyleSheet } from 'react-native'
import ScreenWrapper from '@/components/ScreenWrapper'
import Achievement from '@/components/Achievement'
import { useSelector } from 'react-redux'
import { Achievement as AchievementType } from '@/types'

const Achievements = () => {
  const achievements = useSelector((state: any) => state.user.achievements)

  return (
    <ScreenWrapper title="Achievements">
      <View style={styles.achievementsContainer}>
        {achievements.map((achievement: AchievementType) => (
          <Achievement key={achievement.id} achievement={achievement} />
        ))}
      </View>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  achievementsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 10,
    columnGap: 8
  }
})

export default Achievements
