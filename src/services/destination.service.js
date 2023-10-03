import axios from "axios"
import destinationFromJSON from "../domain/destination/destinationFromJSON"
import { REST_SERVER_URL } from '../environment/constants'

class DestinationService {
    async getAll() {
        const destinationJSON = await axios.get(`${REST_SERVER_URL}/api/destination/search`)
        return destinationJSON.data.map(destination => destinationFromJSON(destination))
    }

    async search(toSearch) {
        const destinationJSON = await axios.get(`${REST_SERVER_URL}/api/destination/search/${toSearch}`)
        return destinationJSON.data.map(destination => destinationFromJSON(destination))
    }

    async create(destination) {
        return axios.post(`${REST_SERVER_URL}/api/destination`, destination)
    }

    async delete(id) {
        return axios.delete(`${REST_SERVER_URL}/api/destination/${id}`)
    }
}

export const destinationService = new DestinationService
