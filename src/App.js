import './App.css'
import {Login} from './components/login/login'
import { Home } from './components/home/home'
import Header from './components/shared/header/header'
import Navigation from './components/shared/navigation/navigation'
import { Routes, Route } from 'react-router-dom'
import Paper from '@mui/material/Paper'
import ActivityView from './components/activity/activity-view/activityView'
import ActivityNewEdit from './components/activity/activity-new/activityNew'
import { usePage, PageProvider } from './context/page.context'
import { Navigate } from 'react-router-dom'
import { Vehicle } from './components/vehicle/vehicle'
import { AddVehicle } from './components/vehicle/add-vehicle/add-vehicle'
import { Destination } from './components/destination/destination'
import ActivityComponent from './components/activity/activity'

export default () => (
  <PageProvider>
    <App />
  </PageProvider>
)

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="*" element={<AppContent />}></Route>
      </Routes>
    </>
  )
}

const AppContent = () => {
  const { pageName } = usePage()
  return !routes.includes(window.location.pathname.split('/')[0]) ? (
    <>NOT FOUND</>
  ) : (
    <>
      <Paper
        sx={{ position: 'fixed', up: 0, left: 0, right: 0, zIndex: 1 }}
        elevation={3}
      >
        <Header title={pageName} />
      </Paper>

      <Paper
        sx={{
          padding: '50px 0',
          minHeight: '90vh',
          maxHeight: '90vh',
          overflow: 'auto',
        }}
        elevation={3}
      >
        <Routes>
          <Route path="home" element={<Home />}></Route>
          <Route path="destination" element={<Destination />}></Route>
          <Route path="activity" element={<ActivityComponent />}>
            <Route path="" element={<ActivityView />}></Route>
            <Route path="edit" element={<ActivityNewEdit />}></Route>
            <Route path="edit/:id" element={<ActivityNewEdit />}></Route>
          </Route>
          <Route path="vehicle" element={<Vehicle />}></Route>
          <Route path="vehicle/add-vehicle" element={<AddVehicle />}></Route>
          <Route path="vehicle/add-vehicle/:id" element={<AddVehicle />}></Route>
        </Routes>
      </Paper>

      <Paper
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <Navigation></Navigation>
      </Paper>
    </>
  )
}

const routes = [
  'home',
  'destination',
  'activity',
  'vehicle',
]
