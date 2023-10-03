export class CreateActivityDTO {
    description
    cost
    initialTime
    endTime
    difficulty

    constructor(data){
        this.description = data.description
        this.cost = data.cost
        this.initialTime = data.initialTime.toISOString()
        this.endTime = data.endTime.toISOString()
        this.difficulty = {
            name: data.difficulty.name,
            priority: data.difficulty.priority
        }
    }
}

export class UpdateActivityDTO {
    id
    description
    cost
    initialTime
    endTime
    difficulty

    constructor(data){
        this.id = data.id
        this.description = data.description
        this.cost = data.cost
        this.initialTime = data.initialTime.toISOString()
        this.endTime = data.endTime.toISOString()
        this.difficulty = {
            name: data.difficulty.name,
            priority: data.difficulty.priority
        }
    }
}
