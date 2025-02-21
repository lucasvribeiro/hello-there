import { useEffect } from 'react'
import { View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import { Achievements } from '@/constants'
import ColorCard from '@/components/ColorCard'
import ColorsList from '@/components/ColorsList'
import ScreenWrapper from '@/components/ScreenWrapper'
import { useToastContext } from '@/contexts/ToastContext'
import { achievementUnlocked } from '@/redux/reducers/user'

const Home = () => {
  const dispatch = useDispatch()
  const { showToast } = useToastContext()
  const history = useSelector((state: any) => state.color.history)
  const currentIndex = useSelector((state: any) => state.color.currentIndex)

  useEffect(() => {
    Achievements.forEach((achievement) => {
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
