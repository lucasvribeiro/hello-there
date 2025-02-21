import { memo, useMemo } from 'react'
import { View, Text, StyleSheet, ViewStyle } from 'react-native'

import { Colors } from '@/constants'
import useTheme from '@/hooks/useTheme'
import { DEFAULT_SHADOW } from '@/constants'
import { Achievement as AchievementType } from '@/types'
import { useSelector } from 'react-redux'

interface AchievementProps {
  achievement: AchievementType
  customStyle?: ViewStyle
}

const Achievement = memo(({ achievement, customStyle }: AchievementProps) => {
  const theme = useTheme()
  const achievements = useSelector((state: any) => state.user.achievements)

  const unlocked = useMemo(() => {
    return achievements.some((item: AchievementType) => item.id === achievement.id)
  }, [achievements, achievement.id])

  return (
    <View style={[styles.container, { backgroundColor: Colors[theme].background }, customStyle]}>
      {!unlocked && (
        <View style={[styles.overlay, { backgroundColor: `${Colors[theme].backgroundLight}DD` }]} />
      )}

      <View style={[styles.content, { backgroundColor: Colors[theme].text }]}>
        <Text style={[styles.icon, { color: Colors[theme].background }]}>{achievement.icon}</Text>

        <Text style={[styles.trigger, { color: Colors[theme].background }]}>
          {achievement.trigger} colors
        </Text>

        <Text style={[styles.title, { color: Colors[theme].background }]}>{achievement.title}</Text>
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  overlay: {
    zIndex: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute'
  },
  container: {
    padding: 6,
    width: 100,
    height: 100,
    borderRadius: 10,
    overflow: 'hidden',
    ...DEFAULT_SHADOW
  },
  content: {
    flex: 1,
    padding: 4,
    borderRadius: 10,
    alignItems: 'center',
    ...DEFAULT_SHADOW
  },
  icon: {
    fontSize: 28,
    marginBottom: 2
  },
  trigger: {
    fontSize: 12,
    lineHeight: 16,
    textAlign: 'center',
    fontFamily: 'Nunito-Light'
  },
  title: {
    fontSize: 16,
    lineHeight: 18,
    textAlign: 'center',
    fontFamily: 'Nunito-Bold'
  }
})

export default Achievement
