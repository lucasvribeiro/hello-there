import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { checkAchievement, setAchievementShown } from '@/redux/reducers/user'
import { useToastContext } from '@/contexts/ToastContext'

const useAchievement = () => {
  const dispatch = useDispatch()
  const { showToast } = useToastContext()
  const history = useSelector((state: any) => state.color.history)
  const achievements = useSelector((state: any) => state.user.achievements)

  useEffect(() => {
    dispatch(checkAchievement({ historySize: history.length }))
  }, [history])

  useEffect(() => {
    if (achievements.length > 0) {
      const item = achievements[achievements.length - 1]

      if (!item.shown) {
        const achievement = item.achievement

        dispatch(setAchievementShown({ trigger: achievement.trigger }))
        showToast(
          `New Achievement: ${achievement.icon} ${achievement.title} - ${achievement.trigger} colors!`,
          2000
        )
      }
    }
  }, [achievements])
}

export default useAchievement
