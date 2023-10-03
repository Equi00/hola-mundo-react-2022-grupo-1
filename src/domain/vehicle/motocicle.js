import { VehicleDomain } from "./vehicle"

export class Motocicle extends VehicleDomain {
    constructor(
        brand = '',
        model = '',
        fabricationYear = '',
        dayCost = '',
        freeMilage = false,
        cylinderCapacity = ''
    ){
        super(brand, model, fabricationYear, dayCost, freeMilage)
        this.cylinderCapacity = cylinderCapacity
        this.id = null
        this.type = 'Motocicle'
    }

    isValid(){
        return this.brand != '' &&
                this.model != '' &&
                this.fabricationYearValid() &&
                this.dayCostValid() &&
                this.cylinderCapacityValid()
    }

    cylinderCapacityValid(){
        return this.cylinderCapacity > 0 && this.cylinderCapacity != ''
    }

    rechargeDays(rentalDays) {
        return this.cylinderCapacity > 250 ? rentalDays * 500 : 0
    }

    isMotocicle() {
        return true
    }
}