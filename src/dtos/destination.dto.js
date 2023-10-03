export class DestinationDTO {
    id
    country
    city
    baseCost

    constructor(data) {
        this.id = data.id
        this.country = data.country
        this.city = data.city
        this.baseCost = data.baseCost
    }
}
