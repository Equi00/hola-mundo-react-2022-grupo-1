import { isBefore } from 'date-fns'
import { CreateActivityDTO, UpdateActivityDTO } from '../../dtos/activity.dto'

export class Activity {
  constructor(
    cost = null,
    description = '',
    initialTime = null,
    endTime = null,
    difficulty = null
  ) {
    this.cost = cost
    this.description = description
    this.initialTime = initialTime
    this.endTime = endTime
    this.difficulty = difficulty
    this.duration = null
    this.id = null
  }

  toCreateJSON(){
    return new CreateActivityDTO(this)
  }

  toUpdateJSON(){
    return new UpdateActivityDTO(this)
  }

  durationInMinutes() {
    return this.duration
  }

  isValid() {
    return this.hasDescription() && 
            this.isTimeValid() && 
            this.isCostValid() &&
            this.hasDifficulty() &&
            this.costIsValid()
  }

  hasDescription() {
    return this.description != ''
  }

  hasDifficulty() {
    return this.difficulty != null
  }

  costIsValid() {
    return this.cost > 0 && this.cost != null
  }

  isTimeValid() {
    return isBefore(this.initialTime, this.endTime)
  }

  isCostValid() {
    return this.cost >= 0
  }

  changeDifficulty(difficulty) {
    this.difficulty = difficulty
  }

}
