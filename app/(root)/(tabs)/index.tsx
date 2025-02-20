import { useSelector } from 'react-redux'

import Toast from '@/components/Toast'
import ColorCard from '@/components/ColorCard'
import ColorsList from '@/components/ColorsList'
import ScreenWrapper from '@/components/ScreenWrapper'
import { View } from 'react-native'
import { useEffect } from 'react'
import { ACHIEVEMENTS } from '@/constants'
import { useDispatch } from 'react-redux'
import { achievementUnlocked } from '@/redux/reducers/user'
import { useToastContext } from '@/contexts/ToastContext'

const Home = () => {
  const dispatch = useDispatch()
  const { showToast } = useToastContext()
  const history = useSelector((state: any) => state.color.history)
  const currentIndex = useSelector((state: any) => state.color.currentIndex)

  useEffect(() => {
    ACHIEVEMENTS.forEach((achievement) => {
      if (history.length === achievement.trigger) {
        showToast(`${achievement.icon} ${achievement.title} - ${achievement.trigger} colors!`, 2000)
        dispatch(achievementUnlocked({ id: achievement.id }))
      }
    })
  }, [history])

  return (
    <ScreenWrapper>
      <ColorCard />

      <View style={{ marginVertical: 5 }}>
        <ColorsList data={history} highlightIndex={currentIndex} />
      </View>
    </ScreenWrapper>
  )
}

export default Home
