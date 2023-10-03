import { CreateVehicleDTO, UpdateVehicleDTO } from "../../dtos/vehicle.dto"

export class VehicleDomain{
    constructor(
        brand = '',
        model = '',
        fabricationYear = '',
        dayCost = '',
        freeMilage = false
    ){
        this.brand = brand
        this.model = model
        this.fabricationYear = fabricationYear
        this.dayCost = dayCost
        this.freeMilage = freeMilage
        this.id = null
        this.agreements = ['Honda']
    }

    toCreateJSON(){
        return new CreateVehicleDTO(this)
    }

    toUpdateJSON(){
        return new UpdateVehicleDTO(this)
    }

    isValid(){
        return this.brand != '' &&
                this.model != '' &&
                this.fabricationYearValid() &&
                this.dayCostValid()
    }

    dayCostValid(){
        return this.dayCost > 0 && this.dayCost != ''
    }

    fabricationYearValid(){
        return this.fabricationYear > 0 && this.fabricationYear <= new Date().getFullYear() && this.fabricationYear != ''
    }

    rechargeDays(rentalDays){
        return rentalDays
    }

    baseCost(rentalDays){
        return this.dayCost * rentalDays
    }

    discountForAgreement(){
        return this.hasAnAgreement() ? 0.9 : 1
    }

    hasAnAgreement(){
        return this.agreements.includes(this.brand)
    }

    totalCost(rentalDays){
        return (this.baseCost(rentalDays) + this.rechargeDays(rentalDays)) * this.discountForAgreement()
    }

    firstBrandWithAgreement(){
        return this.agreements[0]
    }

    antiquity(){
        return new Date().getFullYear() - this.fabricationYear
    }

    addBrandForAgreement(brand){
        this.agreements.concat(brand)
    }

    isTruck(){
        return false
    }

    isCar(){
        return false
    }

    isMotocicle(){
        return false
    }
}