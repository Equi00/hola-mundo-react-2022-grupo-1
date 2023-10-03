import { DestinationDTO } from '../../dtos/destination.dto'

export class Destination {
  static LOCAL = 'Argentina'
  static MAX_ANTIQUITY = 15

  constructor(
    country = '',
    city = '',
    baseCost = 0,
  ) {
    this.country = country
    this.city = city
    this.baseCost = baseCost
  }

  toJSON = () => {
    return new DestinationDTO(this)
  }

  antiquityMax = (topValue) => {
    return this.antiquityMax(topValue)
  }
    
  isLocal = () => {
    return this.country == Destination.LOCAL
  }
    
  totalCostFor = (user) => {
    return (
      this.baseCost + this.localAddedCost() - this.sameCountryDiscount(user)
    )
  }
    
  isValid = () => {
    return this.countryIsValid() && this.cityIsValid() && this.baseCostIsValid()
  }
    
  localAddedCost = () => {
    return this.baseCost * (!this.isLocal() ? 0.2 : 0)
  }
    
  isFromThisCountry = (user) => {
    return this.country.toLowerCase() == user.countryOfResidence.toLowerCase()
  }
    
  sameCountryDiscount = (user) => {
    return this.isFromThisCountry(user)
      ? this.baseCost * (0.01 * user.antiquityMax(Destination.MAX_ANTIQUITY))
      : 0
    }
    
  countryIsValid = () => {
    return this.country.length > 0
  }
    
  cityIsValid = () => {
    return this.city.length > 0
  }
    
  baseCostIsValid = () => {
    return this.baseCost > 0
  }
}
