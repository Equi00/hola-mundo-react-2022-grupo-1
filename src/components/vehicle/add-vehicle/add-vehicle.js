import './add-vehicle.css'
import { useEffect, useState } from 'react'
 import {Checkbox, FormControlLabel, Button, TextField, MenuItem, Alert} from '@mui/material'
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined'
import { useNavigate, useParams } from 'react-router-dom'
import vehicleService from '../../../services/vehicle.service'
import { Car } from '../../../domain/vehicle/car'
import { Motocicle } from '../../../domain/vehicle/motocicle'
import { Truck } from '../../../domain/vehicle/truck'
import { PropTypes } from 'prop-types'
import Collapse from '@mui/material/Collapse'

export const AddVehicle = () => {
    const [isValid, setIsValid] = useState(true)
    const [selectedValue, setSelectedValue] = useState('')
    const [checked4x4, setChecked4x4] = useState(false)
    const [checkedHatchback, setCheckedHatchback] = useState(false)
    const [checkedFree, setCheckedFree] = useState(false)
    const [vehicle, setVehicle] = useState(new Car())
    const [buttonTouched, setButtonTouched] = useState(false)
    const [open, setOpen] = useState(true)

    const navigate = useNavigate()

    const params = useParams()
    let id

    useEffect(() => {
        const main = () => {
            if(params.id){
                id = params.id
            }
        }
        const init = async () => {
            try{
                const getedVehicle = await vehicleService.getById(id)
                setVehicle(getedVehicle)
                setSelectedValue(getedVehicle.type)
            } catch(e) {
                console.error(e)
            }
        }
        main()
        if(params.id) init()
    }, [id])

    const handleSave = async () => {
        let vehicleToHandle
        setButtonTouched(true)
        try {
            vehicleToHandle = vehicle

            if(!vehicleToHandle.isValid()){
                setIsValid(false)
                return
            }
        } catch(e) {
            setIsValid(false)
            return
        }

        if(params.id){
            vehicleToHandle.id = params.id
            await vehicleService.update(vehicleToHandle.toUpdateJSON())
        } else {
            await vehicleService.create(vehicleToHandle.toCreateJSON())
        }
        navigate('/vehicle')
    }

    useEffect(() => {
        selectedValue == 'Car' ?
            setVehicle(new Car(vehicle.brand, vehicle.model, vehicle.fabricationYear, vehicle.dayCost, vehicle.freeMilage, vehicle.hatchback))
        : selectedValue == 'Truck' ?
            setVehicle(new Truck(vehicle.brand, vehicle.model, vehicle.fabricationYear, vehicle.dayCost, vehicle.freeMilage, vehicle.is4x4))
        :
            setVehicle(new Motocicle(vehicle.brand, vehicle.model, vehicle.fabricationYear, vehicle.dayCost, vehicle.freeMilage, vehicle.cylinderCapacity))
        setButtonTouched(false)
        }, [vehicle])
    
    useEffect(() => {
        setVehicle({ ...vehicle, freeMilage: checkedFree})
    }, [checkedFree])

    useEffect(() => {
        setVehicle({ ...vehicle, hatchback: checkedHatchback})
    }, [checkedHatchback])

    useEffect(() => {
        setVehicle({ ...vehicle, is4x4: checked4x4})
    }, [checked4x4])

    const handleChange = (obj) => {
        setSelectedValue(obj.target.value)
    }

    const checking4x4 = () => {
        setChecked4x4(!checked4x4)
    }

    const checkingHatchback = () => {
        setCheckedHatchback(!checkedHatchback)
    }

    const checkingFreeMileage = () => {
        setCheckedFree(!checkedFree)
    }

        return(
            <div className="container main"> 
                <div className="option">
                    <div className='icon-and-brand'>
                        <div className='mark-icon option-hands'>
                            {vehicle.brand.toLowerCase() == 'honda' && <p className="vehicle-brand">
                                    <HandshakeOutlinedIcon></HandshakeOutlinedIcon>
                                </p>}
                        </div>
                        <div className='brand-container'>
                            <VehicleTextField 
                                data-testid="vehicle-brand-label"
                                type="text" 
                                label="Marca"
                                size="small"
                                error={vehicle.brand === ''}
                                autoComplete='off'
                                buttonTouched={buttonTouched}
                                value={vehicle.brand} 
                                onChange={(event) => {
                                    setVehicle({ ...vehicle, brand: event.target.value})
                                }} 
                                />
                        </div>
                    </div>
                </div>
    
                <div className="option">
                    <VehicleTextField 
                        label="Tipo"
                        size="small"
                        data-testid='vehicle-type-select'
                        select
                        error={selectedValue === ''}
                        buttonTouched={buttonTouched}
                        className="select-option"
                        value={selectedValue} 
                        onChange={handleChange}
                        >
                        <MenuItem data-testid='vehicle-car-type' value={"Car"}>Auto</MenuItem>
                        <MenuItem data-testid='vehicle-motocicle-type' value={"Motocicle"}>Moto</MenuItem>
                        <MenuItem data-testid='vehicle-truck-type' value={"Truck"}>Camioneta</MenuItem>
                    </VehicleTextField>
                </div>

                {selectedValue == 'Motocicle' && <div className="option">
                    <VehicleTextField 
                    type="number" 
                    label="Cilindrada"
                    data-testid='vehicle-cylinder-label'
                    size="small"
                    error={vehicle.cylinderCapacity <= 0 || vehicle.cylinderCapacity === ''}
                    autoComplete='off'
                    buttonTouched={buttonTouched} 
                    value={vehicle.cylinderCapacity}
                    onChange={(event) => {
                        setVehicle({ ...vehicle, cylinderCapacity: event.target.value})
                    }}/>
                </div>}
                
                {selectedValue == 'Truck' && <div className = "kilometer-check">
                    <FormControlLabel 
                    control={<Checkbox/>} 
                    label = "Es 4x4"
                    data-testid='vehicle-4x4-checkbox'
                    checked={checked4x4}
                    onChange={checking4x4}
                    />
                </div>}

                {selectedValue == 'Car' && <div className = "kilometer-check">
                    <FormControlLabel 
                    control={<Checkbox/>} 
                    label = "Es Hatchback"
                    data-testid='vehicle-hatchback-checkbox'
                    checked={checkedHatchback}
                    onChange={checkingHatchback}
                    />
                </div>}

                <div className="option">
                    <VehicleTextField 
                        type="text" 
                        label="Modelo"
                        data-testid='vehicle-model-label'
                        size="small"
                        className="input-label"
                        error={vehicle.model === ''}
                        autoComplete='off'
                        buttonTouched={buttonTouched} 
                        value={vehicle.model}
                        onChange={(event) => {
                            setVehicle({ ...vehicle, model: event.target.value})
                        }}/>
                </div>
    
                <div className="option">
                    <VehicleTextField 
                        type="number" 
                        label="Año"
                        data-testid='vehicle-year-label'
                        size="small" 
                        error={vehicle.fabricationYear <= 0 || 
                            vehicle.fabricationYear === '' || 
                            vehicle.fabricationYear > new Date().getFullYear()}
                        autoComplete='off'
                        buttonTouched={buttonTouched}
                        value={vehicle.fabricationYear}
                        onChange={(event) => {
                            setVehicle({ ...vehicle, fabricationYear: event.target.value})
                        }}/>
                </div>
                
                <div className="option">
                    <VehicleTextField 
                        type="number" 
                        label="Costo diario"
                        data-testid='vehicle-day-cost-label'
                        size="small" 
                        error={vehicle.dayCost <= 0 || vehicle.dayCost === ''}
                        autoComplete='off'
                        buttonTouched={buttonTouched} 
                        value={vehicle.dayCost}
                        onChange={(event) => {
                            setVehicle({ ...vehicle, dayCost: event.target.value})
                        }}/>
                </div>
    
                <div className = "kilometer-check">
                    <FormControlLabel 
                    control={<Checkbox/>} 
                    label = "Kilometraje libre"
                    data-testid='vehicle-free-mileage-checkbox'
                    checked={checkedFree}
                    onChange={checkingFreeMileage}
                    />
                </div>

                {isValid ? (
                    <></>
                ) : (
                    <Collapse in={open}>
                        <Alert severity='error'
                        action={<Button color="inherit" size="small" onClick={ () => { setOpen(false) }}> X </Button>}>
                            Complete todos los campos correctamente
                        </Alert>
                    </Collapse>
                )}
                
                <div className="button-container">
                    <Button data-testid="vehicle-share-button" variant="contained" onClick={handleSave}>Guardar</Button>
                    <Button data-testid="vehicle-return-button" variant="outlined" onClick={() => navigate('/vehicle')}>Volver</Button>
                </div>
                
            </div>
        )
    }   

    const VehicleTextField = ({ label, ...other }) => {
        const [touched, setTouched] = useState(false)
      
        return (
          <TextField
            className="edit-input"
            style={{
              backgroundColor: '#ffffff',
              width: '19em',
              marginTop: '20px',
            }}
            label={label}
            size="small"
            {...other}
            error={(touched || other.buttonTouched) && other.error}
            onBlur={() => setTouched(true)}
          />
        )
      }
      
      VehicleTextField.propTypes = {
          label: PropTypes.string.isRequired,
      }