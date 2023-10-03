import React from 'react'
import './navigation.css'
import Box from '@mui/material/Box'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import HomeIcon from '@mui/icons-material/Home'
import HikingIcon from '@mui/icons-material/Hiking'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import LogoutIcon from '@mui/icons-material/Logout'
import { Link } from 'react-router-dom'

const Navigation = () => {
  const [value, setValue] = React.useState(0)
  return (
    <div data-testid="navigation">
      <Box>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue)
          }}
        >
          <BottomNavigationAction
            component={Link}
            to="/home"
            label="Inicio"
            icon={<HomeIcon />}
          />
          <BottomNavigationAction
            component={Link}
            to="/destination"
            label="Destinos"
            icon={<LocationOnIcon />}
          />
          <BottomNavigationAction
            component={Link}
            to="/activity"
            label="Actividades"
            icon={<HikingIcon />}
          />
          <BottomNavigationAction
            component={Link}
            to="/vehicle"
            label="Vehículos"
            icon={<DirectionsCarIcon />}
          />
          <BottomNavigationAction
            component={Link}
            to="/login"
            label="Log Out"
            icon={<LogoutIcon />}
          />
        </BottomNavigation>
      </Box>
    </div>
  )
}

Navigation.propTypes = {}

Navigation.defaultProps = {}

export default Navigation
