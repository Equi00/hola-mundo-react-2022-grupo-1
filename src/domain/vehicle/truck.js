import { VehicleDomain } from "./vehicle"

export class Truck extends VehicleDomain {
    rentalRecharge = 1000
    truckRecharge = 10000

    constructor(
        brand = '',
        model = '',
        fabricationYear = '',
        dayCost = '',
        freeMilage = false,
        is4x4 = false
    ){
        super(brand, model, fabricationYear, dayCost, freeMilage)
        this.is4x4 = is4x4
        this.id = null
        this.type = 'Truck'
    }

    rechargeDays(rentalDays) {
        return (
          (this.truckRecharge + this.rechargeForExcessDays(rentalDays)) *
          this.percentageRechargeFor4x4()
        )
    }

    isTruck() {
        return true
    }

    percentageRechargeFor4x4() {
        return this.is4x4 ? 1.5 : 1
    }

    rechargeForExcessDays(rentalDays) {
        return Math.max(rentalDays - 7, 0) * this.rentalRecharge
    }
}