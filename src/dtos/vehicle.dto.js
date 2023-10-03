
export class CreateVehicleDTO{
    type
    brand
    model
    fabricationYear
    dayCost
    freeMilage
    cylinderCapacity
    hatchback
    is4x4

    constructor(data){
        this.type = data.type
        this.brand = data.brand
        this.model = data.model
        this.fabricationYear = data.fabricationYear
        this.dayCost = data.dayCost
        this.freeMilage = data.freeMilage
        this.cylinderCapacity = data.cylinderCapacity
        this.hatchback = data.hatchback
        this.is4x4 = data.is4x4
    }
}

export class UpdateVehicleDTO{
    id
    type
    brand
    model
    fabricationYear
    dayCost
    freeMilage
    cylinderCapacity
    hatchback
    is4x4

    constructor(data){
        this.id = data.id
        this.type = data.type
        this.brand = data.brand
        this.model = data.model
        this.fabricationYear = data.fabricationYear
        this.dayCost = data.dayCost
        this.freeMilage = data.freeMilage
        this.cylinderCapacity = data.cylinderCapacity
        this.hatchback = data.hatchback
        this.is4x4 = data.is4x4
    }
}