import axios from 'axios'
import activityFromJSON from '../domain/activity/activityFromJson'
import { REST_SERVER_URL } from '../environment/constants'

class ActivityService {
    async getAll(search = ''){
        const activitiesJSON = await axios.get(`${REST_SERVER_URL}/api/activity/search/${search}`)
        return activitiesJSON.data.map(activity => activityFromJSON(activity))
    }

    async getById(id){
        const activityJSON = await axios.get(`${REST_SERVER_URL}/api/activity/${id}`)
        return activityFromJSON(activityJSON.data)
    }

    async delete(id){
        return axios.delete(`${REST_SERVER_URL}/api/activity/${id}`)
    }

    async update(activity){
        return axios.put(`${REST_SERVER_URL}/api/activity`, activity)
    }

    async create(activity){
        return axios.post(`${REST_SERVER_URL}/api/activity`, activity)
    }
}

const activityService = new ActivityService()

export default activityService