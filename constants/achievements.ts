import { Achievement } from '@/types'

export const Achievements: Achievement[] = [
  {
    id: 0,
    trigger: 5,
    title: 'Beginner',
    icon: '🎨'
  },
  {
    id: 1,
    trigger: 10,
    title: 'Explorer',
    icon: '🖌️'
  },
  {
    id: 2,
    trigger: 30,
    title: 'Master',
    icon: '🖼️'
  },
  {
    id: 3,
    trigger: 50,
    title: 'Alchemist',
    icon: '🔮'
  },
  {
    id: 4,
    trigger: 100,
    title: 'Legend',
    icon: '🌈'
  },
  {
    id: 5,
    trigger: 200,
    title: 'Superstar',
    icon: '🦄'
  }
] as const
