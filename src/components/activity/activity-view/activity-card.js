import { useState } from 'react'
import '../activity.css'
import '../../../App.css'
import {
  Card,
  CardContent,
  Divider,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import FmdGoodIcon from '@mui/icons-material/FmdGood'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import activityService from '../../../services/activity.service'
import DifficultyRating from './subcomponents/difficulty-rating'

const ActivityCard = ({ activity, update }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const navigate = useNavigate()

  const deleteActivity = async () => {
    try {
      await activityService.delete(activity.id)
      update()
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Card
      sx={{ maxWidth: 345, minWidth: 345 }}
      className="activity-card not-selectable"
    >
      <CardContent>
        <div className="activity-card-header">
          <FmdGoodIcon />
          <p className="activity-card-title">
            <b data-testid="activity-card-description">{activity.description}</b>
          </p>
          <IconButton
            data-testid={"activity-more-card-button-" + activity.description.replace(/\s/g, '')}
            aria-label="more"
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={() => navigate(`edit/${activity.id}`)} data-testid="activity-edit-button">
              Editar
            </MenuItem>
            <MenuItem onClick={() => deleteActivity()} data-testid="activity-remove-button">
              Eliminar
            </MenuItem>
          </Menu>
        </div>
        <Divider variant="middle" />
        <div className="activity-card-info">
          <div className="activity-card-info-time">
            <span>
              {activity.initialTime.getHours()} Hs. /{' '}
              {activity.endTime.getHours()} Hs. /{' '}
            </span>
            <AccessTimeIcon />
            <span>{activity.duration} min.</span>
          </div>
          <div className="activity-card-info-difficulty">
            <span>Dificultad </span>
            <DifficultyRating
              difficulty={activity.difficulty ? activity.difficulty : undefined}
            />
          </div>
          <div className="activity-card-info-price">
            <span>
              <b>Precio: ${activity.cost}</b>
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

ActivityCard.propTypes = {
  activity: PropTypes.shape({
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    cost: PropTypes.number.isRequired,
    valid: PropTypes.bool.isRequired,
    initialTime: PropTypes.any,
    endTime: PropTypes.any,
    duration: PropTypes.number,
    difficulty: PropTypes.any.isRequired,
  }).isRequired,
  update: PropTypes.func.isRequired,
}

export default ActivityCard
