import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { checkAchievement } from '@/redux/reducers/user'
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
      const lastAchievement = achievements[achievements.length - 1]
      showToast(
        `New Achievement: ${lastAchievement.icon} ${lastAchievement.title} - ${lastAchievement.trigger} colors!`,
        2000
      )
    }
  }, [achievements])
}

export default useAchievement
