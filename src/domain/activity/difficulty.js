export class Difficulty {
  static LOW = new Difficulty('low', 1)
  static MEDIUM = new Difficulty('medium', 2)
  static HIGH = new Difficulty('high', 3)

  constructor(name, priority) {
    this.name = name
    this.priority = priority
  }

  static getDifficultyByPriority(priority) {
    return [Difficulty.LOW, Difficulty.MEDIUM, Difficulty.HIGH].filter(
      (dif) => dif.priority == priority,
    )[0]
  }
}
