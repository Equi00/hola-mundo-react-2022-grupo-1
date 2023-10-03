import StarIcon from '@mui/icons-material/Star'
import HikingIcon from '@mui/icons-material/Hiking'
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff'
import PersonIcon from '@mui/icons-material/Person'
import Box from "@mui/material/Box"
import HomeCard from './home-info/home-card'
import { authService } from '../../services/auth.service'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Collapse from '@mui/material/Collapse'
import Alert from '@mui/material/Alert'
import {Button} from "@mui/material"



export const Home = () => {
  const [info,setInfo] = useState({ itinerariosPuntuados: 0, itinerariosCreados: 0, destinosVisitados: 0, amigos: 0})
  const [error,setError] = useState("")
  const [openAlert, setOpenAlert] = useState(true)
  
  useEffect( () => {
    const homeInit = () => {
          const user = authService.getLoggedUser()
          if(user)
            setInfo(user)    
          else{
            setError("Debe iniciar sesion")
            setOpenAlert(true)
          }
    }

    homeInit()
  },[])

    return (
      <>
      { error === "" ? 
        <Box sx={{...mainBoxStyles }} className="main center-h">
            <HomeCard icon={<StarIcon style={{...iconStyles }}/>} numero={info.itinerariosPuntuados} title="Itinerarios Puntuados"/>
            <HomeCard icon={<HikingIcon style={{...iconStyles }}/>} numero={info.itinerariosCreados} title="Itinerarios Creados"/>
            <HomeCard icon={<FlightTakeoffIcon style={{...iconStyles }}/>} numero={info.destinosVisitados} title="Destinos Visitados"/>
            <HomeCard icon={<PersonIcon style={{...iconStyles }}/>} numero={info.amigos} title="Amigos"/>
            <div className="below-box"></div>
        </Box>
      :
      <Collapse in={openAlert}>
        <Alert severity="error" sx={{...alertStyles}} data-testid="alert-message" action={
              <Button color="inherit" size="small" onClick={ () => { setOpenAlert(false) }}> X </Button>
          }>{error}
        </Alert> 
      </Collapse>
        }
      </>
    )
}

Home.propTypes = {
  user: PropTypes.object,
  info: PropTypes.shape({
    itinerariosPuntuados: PropTypes.number.isRequired, 
    itinerariosCreados: PropTypes.number.isRequired, 
    destinosVisitados: PropTypes.number.isRequired, 
    amigos: PropTypes.number.isRequired}),
}

  const mainBoxStyles = {
    display: "flex-column",   
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "0.5rem", 
    paddingBottom: "0.5rem",  
    height: "content",
  }

  const iconStyles = {
    color: "black", 
    fontSize: "5rem",
    ml: "1%",
    mt: "1.2%",
    width: "30%",
    paddingTop: "0.5rem",
  }

  const alertStyles = {
    mt: "200px",
    mx:"auto", 
    width: "360px"
  }
