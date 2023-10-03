import '../destination.css'
import AddIcon from '@mui/icons-material/Add'
import PropTypes from 'prop-types'
import { Button, Dialog, DialogContent, DialogContentText, Stack, TextField, Select, MenuItem, Fab, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { destinationService } from "../../../services/destination.service"
import { Destination } from '../../../domain/destination/destination'

export const NewDestination = ( {updateDestinations} ) => {
    const options = [
        { value: 'Argentina', label: 'Argentina' },
        { value: 'Uruguay', label: 'Uruguay' },
        { value: 'Brazil', label: 'Brazil' },
        { value: 'Estados Unidos', label: 'Estados Unidos' },
        { value: 'Canada', label: 'Canada' },
        { value: 'Islandia', label: 'Islandia' },
        { value: 'Italia', label: 'Italia' },
        { value: 'España', label: 'España' },
        { value: 'Japon', label: 'Japon' }
    ]

    const [openDialog, setOpenDialog] = useState(false)
    const [destination, setDestination] = useState(new Destination())
    const [isValid, setIsValid] = useState(false)

    const handleClickOpen = () => {
        setDestination({...destination, country: '', city: '', baseCost: ''})
        setOpenDialog(true)
    }
    
    const handleClose = () => {
        setOpenDialog(false)
    }

    const addDestination = async () => {
        setOpenDialog(false)
        try {
            await destinationService.create(new Destination(destination.country, destination.city, destination.baseCost))
            updateDestinations()
        } catch (error) {
            console.error(error)
        }
    }

    const isDestinationValid = () => {
        const validateDestination = new Destination(destination.country, destination.city, destination.baseCost)
        return validateDestination.isValid()
    }

    useEffect(() => {
        setIsValid(isDestinationValid())
    }, [destination])

    return (
        <div>
            <Fab
                data-testid="add-destination-button"
                color="primary"
                aria-label="add"
                onClick={handleClickOpen}
                sx={{ position: 'fixed', bottom: '65px', right: '25px' }}
                >
                <AddIcon />
            </Fab>
            <Dialog open={openDialog}>
                <div className="title-container">
                    <Stack id="alert-dialog-title" className="title" sx={{fontWeight: "bold", fontSize:"1.5rem", justifySelf:"center", alignSelf:"center", mt:"5%"}}>
                        {"Nuevo Destino"}
                    </Stack>
                </div>
                <DialogContent>
                    <DialogContentText sx={{mt: "0.5rem"}}> Pais 
                    <Select
                        className="select-option"
                        data-testid="country-select"
                        options={options}
                        value={destination.country}
                        onChange={(event) => {setDestination({...destination, country: event.target.value})}}
                        sx={{width: "100%",}}>
                        {options.map((item, index) => 
                            <MenuItem data-testid={`option-${item.label}`} key={index} value={item.value}>{item.label}</MenuItem>
                        )}
                    </Select>
                    </DialogContentText >
                    <DialogContentText sx={{mt: "0.5rem"}} > Ciudad 
                    <TextField
                        data-testid="city-input"
                        margin="dense"
                        id="outlined-basic"
                        fullWidth
                        variant="outlined"
                        type="text"
                        autoComplete="off"
                        sx={{color: "#1976d2"}}
                        value={destination.city}
                        onChange={(event) => {setDestination({...destination, city: event.target.value})}}
                    />
                    </DialogContentText>
                    <DialogContentText sx={{mt: "0.5rem"}}> Costo Base 
                    <TextField
                        data-testid="cost-input"
                        margin="dense"
                        id="outlined-basic"
                        fullWidth
                        variant="outlined"
                        type="number"
                        autoComplete="off"
                        btn="3"
                        sx={{color: "#1976d2"}}
                        value={destination.baseCost}
                        onChange={(event) => {setDestination({...destination, baseCost: event.target.value})}}
                    />
                    </DialogContentText>
                    { isValid
                    ? <></>
                    : <Typography sx={{mt: "0.5rem", color:"#f44336"}}>Complete los campos para continuar</Typography>
                    }
                    <div className="action-btns">
                        { isValid
                        ? <Button data-testid="done-button" variant="contained" onClick={addDestination} className="done-btn" sx={{width: "50%", mr: "1rem", ml: "2rem", mt: "6%", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>Aceptar</Button>
                        : <Button data-testid="done-button-disabled" variant="contained" className="done-btn" disabled sx={{width: "50%", mr: "1rem", ml: "2rem", mt: "6%", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>Aceptar</Button>
                        }
                        <Button data-testid="cancel-button" variant="outlined" onClick={handleClose} className="cancel-btn" sx={{width: "50%", mr: "2rem", ml: "1rem", mt: "6%", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>Cancelar</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

NewDestination.propTypes={
    updateDestinations: PropTypes.func.isRequired
}
