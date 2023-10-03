import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined'
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler'
import { Card, CardContent, IconButton, Menu, MenuItem,} from '@mui/material'
import Divider from '@mui/material/Divider'
import './vehicle.css'
import { PropTypes } from 'prop-types'
import { VehicleDomain } from '../../domain/vehicle/vehicle'
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import vehicleService from '../../services/vehicle.service'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const VehicleCard = ({vehicle, update}) => {
    const [anchorEl, setAnchorEl] = useState(null)
    const openMenu = Boolean(anchorEl)
    const navigate = useNavigate()

    const deleteOneVehicle = async () => {
        try {
            await vehicleService.delete(vehicle.id)
            update()
        } catch(e) {
            console.error(e)
        }
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
      }
      const handleClose = () => {
        setAnchorEl(null)
      }

    const typeVehicle = () => {
        return vehicle.isCar() ? <div className = "type-icon">
                                    <p className="vehicle-type">Auto</p>
                                    <DirectionsCarIcon></DirectionsCarIcon>
                                </div>
            : vehicle.isTruck() ? <div className = "type-icon">
                                        <p className="vehicle-type">Camioneta</p>
                                        <AirportShuttleIcon></AirportShuttleIcon>
                                   </div>
                                : <div className = "type-icon">
                                    <p className="vehicle-type">Moto</p>
                                    <TwoWheelerIcon></TwoWheelerIcon>
                                </div>
    }

    return (
        <Card sx={{ maxWidth: 345, minWidth: 345 }} className="vehicle-card">
            <CardContent sx={{padding: 0,"&:last-child": {paddingBottom: 0}}}>
                <div className="vehicle-card-icon" data-testid="vehicle-card">
                    {typeVehicle()}
                    <div className = "edit-delete">
                        <IconButton
                            aria-label="more"
                            sx={{color: 'white'}}
                            data-testid={"vehicle-more-card-button-" + vehicle.brand.replace(/\s/g, '')}
                            id="basic-button"
                            aria-controls={openMenu ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={openMenu ? 'true' : undefined}
                            onClick={handleClick}
                        >
                            <MoreVertIcon />
                        </IconButton>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={openMenu}
                            onClose={handleClose}
                            MenuListProps={{
                            'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={() => navigate(`add-vehicle/${vehicle.id}`)} data-testid='vehicle-edit-button'>Editar</MenuItem>
                            <MenuItem onClick={() => deleteOneVehicle()} data-testid='vehicle-delete-button'>Eliminar</MenuItem>
                        </Menu>
                    </div>
                </div>
                <div className="vehicle-card-info">
                    <div className = "vehicle-brand-contract">
                        <p className="vehicle-brand">
                            Marca <b className="space-brand" data-testid='vehicle-card-brand'>{vehicle.brand}</b>
                        </p>
                        <p className="vehicle-with-contract">
                            {vehicle.brand.toLowerCase() == "honda" && <HandshakeOutlinedIcon></HandshakeOutlinedIcon>}
                        </p>
                    </div>
                    <p className="vehicle-model">
                        Modelo <b>{vehicle.model}</b> - <b>{vehicle.fabricationYear}</b>
                    </p>
                </div>
                <div className="vehicle-card-costs">
                    <Divider variant="middle"/>
                    <div className="vehicle-costs">
                        <p className="vehicle-cost-per-day">
                            Costo por dia <b>$ {vehicle.dayCost}</b>
                        </p>
                        <p className="vehicle-cost-base">
                            Costo Base <b>$ {vehicle.baseCost(20)}</b>
                        </p>
                    </div>
                    <Divider variant="middle"/>
                    <div className="vehicle-total-cost">
                        <p className="vehicle-total-cost-text">
                            <b>$ {vehicle.totalCost(20)}</b>
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

VehicleCard.propTypes = {
    vehicle: PropTypes.instanceOf(VehicleDomain),
    update: PropTypes.func.isRequired,
}

export default VehicleCard