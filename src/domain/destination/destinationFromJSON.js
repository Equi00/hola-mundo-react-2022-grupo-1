import { Destination } from './destination'

export default function destinationFromJSON(destinationDTO) {
  const newDestination =  Object.assign(new Destination(), destinationDTO , {})
  return newDestination
}
