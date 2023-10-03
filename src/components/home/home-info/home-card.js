import PropTypes from 'prop-types'
import Box from "@mui/material/Box"
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'

const HomeCard = (props) => {

return (
    <Box sx={{ ...homeStyles }}>
        {props.icon}  
        <Box sx={{...contentStyles}}>
            <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={0}
            >
                <Item sx={{...numberStyles}} data-testid="card-quantity">{props.numero}</Item>
                <Item sx={{...letterStyles}}>{props.title}</Item>
            </Stack>
        </Box>
  </Box>
)
}

HomeCard.propTypes = {
    icon: PropTypes.element.isRequired,
    title: PropTypes.string.isRequired,
    numero: PropTypes.number.isRequired,
  }

const homeStyles = {
    bgcolor: "white",
    m: 3,
    borderColor: "black",
    border: 1,
    borderRadius: "16px",
    width: "360px",
    height: "100px",
    boxShadow: '1px 2px 4px grey',
    display: "flex",
    alignContent: "center",
    justifyItems: "center",
  }

const contentStyles = {
    width: "70%", 
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    justifyItems: "center",
    mr: "1.2%",
}
    
const numberStyles = {
    fontSize: "3rem",
    fontWeight: "700",
    width: "95%",
    mt: "0.1rem"
}
    
const letterStyles = {
    fontSize: "1rem",
    fontWeight: "700",
    width: "95%",
    paddingBottom: "0.7rem",
}

const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: "white",
        ...theme.typography.black,
        textAlign: 'center',
        color: "black",
        boxShadow: "none",
        
}))

export default HomeCard