import { Activity } from './activity'
import { Difficulty } from './difficulty'

export default function activityFromJSON(activityDTO) {
  const newActivity = Object.assign(new Activity(), activityDTO, {
    initialTime: new Date(activityDTO.initialTime),
    endTime: new Date(activityDTO.endTime),
    difficulty: Difficulty.getDifficultyByPriority(activityDTO.difficulty.priority),
  })
  return newActivity
}
