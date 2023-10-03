import './vehicle.css'
import { Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useNavigate} from 'react-router-dom'
import SearchBar from '../shared/searchBar/searchBar'
import {VehicleCard} from './vehicle-card'
import { useState, useEffect } from 'react'
import vehicleService from '../../services/vehicle.service'

export const Vehicle = () => {
    const navigate = useNavigate()

    const [filterText, setFilterText] = useState('')
    const [vehicles, setVehicles] = useState([])

    const getVehicles = async () => {
        try {
            const newVehicles = await vehicleService.getAll()
            await setVehicles(newVehicles)
        } catch (e) {
            console.error(e)
        }
    }

    const handleSearch = async(event) => {
        setFilterText(event.target.value)
        try {
            const getVehicles = await vehicleService.getAll(event.target.value)
            await setVehicles(getVehicles) 
        } catch(e) {
            console.error(e)
        }
    }

    useEffect(() => {
        getVehicles()
    }, [])

    return (
        <>
            <div className = "vehicle-container main" data-testid="vehicle">
                <div className="search">
                    <SearchBar placeholder="Buscar..." searchBarWidth="100%" value={filterText} onChange={handleSearch}></SearchBar>
                </div>

                {vehicles.length == 0 ? (
                    <p>No se encontro ningun vehiculo.</p>
                ) : (
                    <></>
                )}

                {
                    vehicles.map((vehicle) =>
                    <VehicleCard
                        vehicle={vehicle}
                        key={vehicle.id}
                        update={getVehicles}/>)
                }

               <Fab
                    color="primary"
                    data-testid='add-vehicle-button'
                    aria-label="add"
                    onClick={() => navigate('add-vehicle')}
                    sx={{ position: 'fixed', bottom: '65px', right: '25px' }}
                    >
                    <AddIcon />
                </Fab>

                <div className= 'space'></div>
            </div>
        </>
    )
}