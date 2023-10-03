import { TextField }from "@mui/material"
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import KeyIcon from '@mui/icons-material/Key'
import FacebookIcon from '@mui/icons-material/Facebook'
import {Button} from "@mui/material"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Alert from '@mui/material/Alert'
import Collapse from '@mui/material/Collapse'
import { authService } from '../../services/auth.service'
import './login.css'

export const Login = () => {
    const [data,setData] = useState({userName: "",password: ""})
    const [error,setError] = useState("")
    const [openAlert, setOpenAlert] = useState(true)
    
    function foundData(field){
        return field !== ''
    }

    const navigate = useNavigate()

    const goHome = () => {
        navigate('/home')
    }
    
    const userLogin = async () => {  
        try {
            const _access = await authService.logInUser( data.userName, data.password )
            if( _access ){
                setError("")
                goHome()
            } else {
                setError("Usuario o Contraseña incorrectos") 
                setOpenAlert(true)
            } 
        } catch (error) {
            generarError(error)
            setOpenAlert(true)
        }
    }

    const generarError = (error) => {
        setError( error.response?.data ? error.response.data.message : error.message )
      }
 
    const submitHandler = e => {
        e.preventDefault()
        setError("")
        if(foundData(data.userName) && foundData(data.password)){
            setData(data)
            userLogin()
        }
        else{
            setError("Debe ingresar Usuario y Contraseña")
            setOpenAlert(true)
        }
    }

    return (
        <>
        <form className="login-card main center-h" onSubmit={submitHandler}>
            <div className="login-card-header">
                <h3 className="login-card-title">Hola Mundo!</h3>
            </div>        
                <div className="login-input-container">
                    <AccountBoxIcon className="form-label" style={{fontSize: "3.5rem", color: "#42a5f5"}}/>
                    <TextField id="outlined-basic" data-testid="username-input" label="Usuario" variant="outlined" sx={{borderColor: "#42a5f5", boxShadow: '1px 2px 4px grey', width: "85%"}}
                    onChange={e => { setData({...data,userName: e.target.value}) 
                                     setError("") }} value={data.userName}
                    type="userName" />
                </div>
            <div className="login-input-container">
                <KeyIcon style={{fontSize: "3.5rem", color: "#42a5f5"}}/>
                <TextField type="password" data-testid="password-input" id="outlined-basic" label="Contraseña" variant="outlined" margin="dense" fullWidth sx={{borderColor: "#42a5f5", boxShadow: '1px 2px 4px grey', width: "85%"}}
                    onChange={e => { setData({...data,password: e.target.value})
                                     setError("") }} value={data.password}/>
            </div>
            <div className="login-btn-container">
                <Button className="login-btn" data-testid="submit" variant="contained" type="submit">Ingresar</Button>
            </div>
           { error!=="" ?
            <Collapse in={openAlert
}>
                <Alert data-testid="alert-message" severity="error" action={
                        <Button color="inherit" size="small" onClick={ () => { setOpenAlert(false) }}> X </Button>
                    }>{error}</Alert> </Collapse> : <></> }
        </form>

        <div className="footer-content">
            <FacebookIcon className="facebook-img" />
            <p><strong>HolaMundo!</strong> / 2022</p>
        </div>
        
        </>
    )}