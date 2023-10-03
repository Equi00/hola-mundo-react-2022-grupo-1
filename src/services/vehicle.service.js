import axios from 'axios'
import vehicleFromJSON from '../domain/vehicle/vehicleFromJSON'
import { REST_SERVER_URL } from '../environment/constants'

class VehicleService{
    async getAll(search = ''){
        const vehiclesJSON = await axios.get(`${REST_SERVER_URL}/api/vehicle/search/${search}`)
        return vehiclesJSON.data.map(vehicle => vehicleFromJSON(vehicle))
    }

    async getById(id){
        const vehicleJSON = await axios.get(`${REST_SERVER_URL}/api/vehicle/${id}`)
        return vehicleFromJSON(vehicleJSON.data)
    }

    async delete(id){
        return axios.delete(`${REST_SERVER_URL}/api/vehicle/${id}`)
    }

    async update(vehicle){
        return axios.put(`${REST_SERVER_URL}/api/vehicle`, vehicle)
    }

    async create(vehicle){
        return axios.post(`${REST_SERVER_URL}/api/vehicle`, vehicle)
    }
}

const vehicleService = new VehicleService()

export default vehicleService