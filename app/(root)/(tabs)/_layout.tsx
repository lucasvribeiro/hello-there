import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { useSelector } from 'react-redux'
import { Colors } from '@/constants'
import useTheme from '@/hooks/useTheme'

const TabLayout = () => {
  const theme = useTheme()
  const favorites = useSelector((state: any) => state.color.favorites)

  return (
    <Tabs
      backBehavior="history"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: Colors[theme].text,
        tabBarInactiveTintColor: Colors[theme].textLight,
        tabBarIconStyle: { margin: 'auto' },
        tabBarStyle: {}
      }}
    >
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ focused, color }) => (
            <Ionicons name={focused ? 'settings' : 'settings-outline'} color={color} size={24} />
          )
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarBadge: favorites.length,
          tabBarBadgeStyle: {
            height: 14,
            minWidth: 14,
            fontSize: 10,
            lineHeight: 14,
            color: '#FFFFFF',
            fontFamily: 'Nunito-Bold',
            backgroundColor: '#888888'
          },
          tabBarIcon: ({ focused, color }) => (
            <Ionicons name={focused ? 'heart' : 'heart-outline'} color={color} size={24} />
          )
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused, color }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} color={color} size={24} />
          )
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ focused, color }) => (
            <Ionicons name={focused ? 'apps' : 'apps-outline'} color={color} size={24} />
          )
        }}
      />
      <Tabs.Screen
        name="achievements"
        options={{
          title: 'Achievements',
          tabBarIcon: ({ focused, color }) => (
            <Ionicons name={focused ? 'trophy' : 'trophy-outline'} color={color} size={24} />
          )
        }}
      />
    </Tabs>
  )
}

export default TabLayout
