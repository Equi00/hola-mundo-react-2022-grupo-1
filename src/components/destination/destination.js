import DeleteIcon from '@mui/icons-material/Delete'
import SearchBar from '../shared/searchBar/searchBar'
import { IconButton, List, ListItem, ListItemText, Tooltip, Typography } from '@mui/material'
import { NewDestination } from './new-destination/new-destination'
import { useEffect, useState } from 'react'
import { destinationService } from '../../services/destination.service'

import './destination.css'

export const Destination = () => {
    const [destinations, setDestinations] = useState([])
    const [searchValue, setSearchValue] = useState('')

    const getDestinations = async () => {
        try {
            const destinationList = await destinationService.search(searchValue)
            await setDestinations(destinationList)
        } catch (error) {
            console.error(error)
        }
    }

    const deleteDestination = async (id) => {
        try {
            await destinationService.delete(id)
            getDestinations()
        } catch (error) {
            console.error(error)
        }
    }
    
    useEffect(() => {
        getDestinations()
    }, [searchValue] )

    return (
        <div className='main'>
            <div className='search-wrapper'>
                <SearchBar
                    placeholder="Buscar"
                    searchBarWidth="100%"
                    value={searchValue}
                    onChange={(event) => {setSearchValue(event.target.value)}}>
                </SearchBar>
            </div>
            <div className='destination-wrapper'>
                { destinations.length == 0
                    ?
                    <Typography align="center" sx={{mt: "0.5rem", color:"#f44336"}}>No se encontraron destinos</Typography>
                    :
                    <List className='destination-list'>
                        {destinations.map((item, index) => 
                            <ListItem className='destination-item' key={index} disableGutters>
                                <ListItemText className='destination-content' primary={`${item.country} - ${item.city}`} />
                                <Tooltip title="Delete">
                                    <IconButton data-testid={`delete-${item.country}-${item.city}`} onClick={() => deleteDestination(index)}>
                                        <DeleteIcon className='delete-icon' sx={{color:"#f44336"}}/>
                                    </IconButton>
                                </Tooltip>
                            </ListItem>
                        )}
                    </List>
                }
            </div>
            <div className="below-box"></div>
            <div className="below-box"></div>
            <NewDestination updateDestinations={getDestinations}/>
        </div>
    )
}
