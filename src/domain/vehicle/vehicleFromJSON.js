
import {Car} from '../vehicle/car'
import {Motocicle} from '../vehicle/motocicle'
import {Truck} from '../vehicle/truck'

export default function vehicleFromJSON(vehicleDTO) {
    const newVehicle = Object.assign(
        vehicleDTO.type == 'Car'
          ? new Car()
          : vehicleDTO.type == 'Motocicle'
          ? new Motocicle()
          : new Truck(),
        vehicleDTO
      )
    return newVehicle
}