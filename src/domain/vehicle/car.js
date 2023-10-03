import { VehicleDomain } from "./vehicle"

export class Car extends VehicleDomain {
    constructor(
        brand = '',
        model = '',
        fabricationYear = '',
        dayCost = '',
        freeMilage = false,
        hatchback = false
    ){
        super(brand, model, fabricationYear, dayCost, freeMilage)
        this.hatchback = hatchback
        this.id = null
        this.type = 'Car'
    }

    isCar(){
        return true
    }
}