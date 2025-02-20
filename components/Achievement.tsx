import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Achievement as AchievementType } from '@/types'
import { DEFAULT_SHADOW } from '@/constants'
import useTheme from '@/hooks/useTheme'
import { Colors } from '@/constants/Colors'

const Achievement = ({ achievement }: { achievement: AchievementType }) => {
  const { theme } = useTheme()

  return (
    <View style={[styles.achievementContainer, { backgroundColor: Colors[theme].background }]}>
      {!achievement.unlocked && (
        <View style={[styles.overlay, { backgroundColor: `${Colors[theme].backgroundLight}CC` }]} />
      )}

      <View style={[styles.achievementContent, { backgroundColor: Colors[theme].text }]}>
        <Text style={[styles.achievementIcon, { color: Colors[theme].background }]}>
          {achievement.icon}
        </Text>
        <Text style={[styles.achievementTrigger, { color: Colors[theme].background }]}>
          {achievement.trigger} colors
        </Text>
        <Text style={[styles.achievementTitle, { color: Colors[theme].background }]}>
          {achievement.title}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  achievementContainer: {
    overflow: 'hidden',
    borderRadius: 10,
    padding: 6,
    height: 100,
    width: 100,
    ...DEFAULT_SHADOW
  },
  overlay: {
    zIndex: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute'
  },
  achievementContent: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 10,
    padding: 4,
    ...DEFAULT_SHADOW
  },
  achievementIcon: {
    marginBottom: 2,
    fontSize: 28
  },
  achievementTitle: {
    textAlign: 'center',
    fontFamily: 'Nunito-Bold',
    lineHeight: 18,
    fontSize: 16
  },
  achievementTrigger: {
    fontSize: 12,
    fontFamily: 'Nunito-Light',
    textAlign: 'center',
    lineHeight: 16
  }
})

export default Achievement
