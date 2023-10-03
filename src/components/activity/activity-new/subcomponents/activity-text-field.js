import { TextField } from '@mui/material'
import { PropTypes } from 'prop-types'
import { useState } from 'react'

const ActivityTextField = ({ label, ...other }) => {
  const [touched, setTouched] = useState(false)

  return (
    <TextField
      className="edit-input"
      style={{
        backgroundColor: '#ffffff',
        width: '80%',
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

ActivityTextField.propTypes = {
    label: PropTypes.string.isRequired,
}

export default ActivityTextField