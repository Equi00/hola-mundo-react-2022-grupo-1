import axios from 'axios'
import PropTypes from 'prop-types'
import { userFromJson } from '../domain/user/user'
import { REST_SERVER_URL } from '../environment/constants'

class AuthService {
    userLoggedIn = undefined
    authenticationResponse = false
    error

    async logInUser(username, password){
        await axios.get(
            `${REST_SERVER_URL}/api/auth/${username}/${password}`
        ).then(res => { 
            this.authenticationResponse = res.data
        } ).catch( (error) => {this.error = error.data})

        return this.authenticationResponse
          ? this.changeLoggedUser(await this.getByUserName(username) )
          : false
      }

      async getByUserName(username) {
        const user$ = await axios.get(`${REST_SERVER_URL}/api/user/username/${username}`)
        return user$ ? userFromJson(user$.data) : undefined
      }      

      changeLoggedUser(user) {
        this.userLoggedIn = user
        return true
      }
    
      getLoggedUser() {
        return this.userLoggedIn
      }
    
      logOutUser() {
        userLoggedIn = null
      }
} 

AuthService.propTypes = {
    authenticationResponse: PropTypes.bool,
    userLoggedIn: PropTypes.object,
  }

export const authService = new AuthService()