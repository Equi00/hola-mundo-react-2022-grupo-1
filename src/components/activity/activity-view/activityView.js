import SearchBar from '../../shared/searchBar/searchBar'
import ActivityCard from './activity-card'
import '../activity.css'
import { Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import activityService from '../../../services/activity.service'

const ActivityView = () => {
  const navigate = useNavigate()
  const [activities, setActivities] = useState([])
  const [filterText, setFilterText] = useState('')

  const getAllActivities = async () => {
    try {
      const getedActivities = await activityService.getAll()
      await setActivities(getedActivities)
    } catch (e) {
      console.error(e)
    }
  }

  const handleSearch = async (event) => {
    setFilterText(event.target.value)
    try {
      const getedActivities = await activityService.getAll(event.target.value)
      await setActivities(getedActivities)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getAllActivities()
  }, [])

  return (
    <div className="center-h main">
      <SearchBar
        placeholder="Buscar..."
        searchBarWidth="100%"
        value={filterText}
        onChange={handleSearch}
      />
      {activities.length == 0 ? (
        <p>No se encontro ninguna actividad.</p>
      ) : (
        <></>
      )}
      {activities
        .sort((a, b) => {
          const textA = a.description.toUpperCase()
          const textB = b.description.toUpperCase()
          return textA < textB ? -1 : textA > textB ? 1 : 0
        })
        .map((activity) => (
          <ActivityCard
            activity={activity}
            key={activity.id}
            update={getAllActivities}
          />
        ))}
      <Fab
        data-testid="add-activity-button"
        color="primary"
        aria-label="add"
        onClick={() => navigate('edit')}
        sx={{ position: 'fixed', bottom: '65px', right: '25px' }}
      >
        <AddIcon />
      </Fab>
      <div className="below-box"></div>
    </div>
  )
}

export default ActivityView
