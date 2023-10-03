import { Alert, Button, Divider, MenuItem } from '@mui/material'
import '../activity.css'
import { useNavigate, useParams } from 'react-router-dom'
import { Difficulty } from '../../../domain/activity/difficulty'
import activityService from '../../../services/activity.service'
import { Activity } from '../../../domain/activity/activity'
import { useState, useEffect } from 'react'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import ActivityTextField from './subcomponents/activity-text-field'

const ActivityNewEdit = () => {
  const navigate = useNavigate()
  const [activity, setActivity] = useState(new Activity())
  const [isValid, setIsValid] = useState(true)
  const [buttonTouched, setButtonTouched] = useState(false)

  const params = useParams()
  let id

  useEffect(() => {
    // Si el id no es nulo, estamos editando una actividad
    const main = () => {
      if (params.id) {
        id = params.id
      }
    }

    // Funcion de inicializacion de la pagina, solo corre si estamos en modo edicion
    const init = async () => {
      try {
        const getedActivity = await activityService.getById(id)
        setActivity(getedActivity)
      } catch (e) {
        console.error(e)
      }
    }

    main()
    if (params.id) init()
  }, [id])

  const handleSave = async () => {
    // Creacion de la actividad a manipular y sus validaciones
    let activityToHandle
    setButtonTouched(true)
    try {
      activityToHandle = new Activity(
        activity.cost,
        activity.description,
        new Date(activity.initialTime.toISOString().split('.')[0] + 'z'),
        new Date(activity.endTime.toISOString().split('.')[0] + 'z'),
        activity.difficulty,
      )
      if (!activityToHandle.isValid()) {
        setIsValid(false)
        return
      }
    } catch (e) {
      setIsValid(false)
      return
    }

    // Creacion o actualizacion de la actividad dependiendo de lo que corresponda
    if (params.id) {
      activityToHandle.id = params.id
      await activityService.update(activityToHandle.toUpdateJSON())
    } else {
      await activityService.create(activityToHandle.toCreateJSON())
    }

    // Navegacion nuevamente a la pagina de actividades
    navigate('/activity')
  }

  useEffect(() => {
    console.log('activity:', activity)
    setButtonTouched(false)
    setIsValid(true)
  }, [activity])

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="main column-space-between">
          <div className="activity-form center-h">
            {/* DESCRIPCION */}
            <ActivityTextField
              data-testid="activity-description-label"
              value={activity.description}
              touch={(e) => {
                console.log(e)
              }}
              onChange={(event) => {
                setActivity({ ...activity, description: event.target.value })
              }}
              label="Descripcion"
              multiline
              buttonTouched={buttonTouched}
              error={activity.description === ''}
            />

            <Divider
              variant="middle"
              style={{ width: '90%', marginTop: '20px' }}
            />

            {/* HORA DE INICIO */}
            <TimePicker
              label="Hora de inicio"
              value={dayjs(activity.initialTime)}
              onChange={(val) => {
                if (val) setActivity({ ...activity, initialTime: val.toDate() })
              }}
              renderInput={(params) => (
                <ActivityTextField
                  data-testid="activity-hora-inicio-label"
                  {...params}
                  error={
                    dayjs(activity.endTime).diff(
                      dayjs(activity.initialTime),
                      'minute',
                    ) <= 0 || activity.initialTime === null
                  }
                  buttonTouched={buttonTouched}
                />
              )}
            />

            {/* HORA DE FINALIZACION */}
            <TimePicker
              label="Hora de finalizacion"
              value={dayjs(activity.endTime)}
              onChange={(val) => {
                if (val) setActivity({ ...activity, endTime: val.toDate() })
              }}
              renderInput={(params) => (
                <ActivityTextField
                  data-testid="activity-hora-final-label"
                  {...params}
                  buttonTouched={buttonTouched}
                  error={
                    dayjs(activity.endTime).diff(
                      dayjs(activity.initialTime),
                      'minute',
                    ) <= 0 || activity.endTime === null
                  }
                />
              )}
            />
            <p>
              Duracion:
              <b
                className={
                  dayjs(activity.endTime).diff(
                    dayjs(activity.initialTime),
                    'minute',
                  ) <= 0
                    ? 'activity-error-text pl5'
                    : 'pl5'
                }
              >
                {dayjs(activity.endTime).diff(
                  dayjs(activity.initialTime),
                  'minute',
                )
                  ? dayjs(activity.endTime).diff(
                      dayjs(activity.initialTime),
                      'minute',
                    )
                  : 0}{' '}
                minutos
              </b>
            </p>

            <Divider variant="middle" style={{ width: '90%' }} />

            {/* DIFICULTAD */}
            <ActivityTextField
              data-testid="activity-dificultad-select"
              label="Dificultad"
              select
              value={activity.difficulty}
              onChange={(e) => {
                setActivity({
                  ...activity,
                  difficulty: Difficulty.getDifficultyByPriority(
                    e.target.value.priority,
                  ),
                })
              }}
              buttonTouched={buttonTouched}
              error={activity.difficulty === null}
            >
              <MenuItem data-testid="activity-dificultad-baja" value={Difficulty.LOW}>Baja</MenuItem>
              <MenuItem data-testid="activity-dificultad-media" value={Difficulty.MEDIUM}>Media</MenuItem>
              <MenuItem data-testid="activity-dificultad-alta" value={Difficulty.HIGH}>Alta</MenuItem>
            </ActivityTextField>

            {/* COSTO */}
            <ActivityTextField
              data-testid="activity-costo-label"
              label="Costo"
              value={activity.cost}
              onChange={(event) => {
                setActivity({ ...activity, cost: event.target.value })
              }}
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              buttonTouched={buttonTouched}
              error={
                activity.cost === '' ||
                activity.cost === null ||
                activity.cost <= 0
              }
            />
          </div>

          {/* VALIDACION */}
          {isValid ? (
            <></>
          ) : (
            <Alert severity="error">
              Complete todos los campos correctamente
            </Alert>
          )}

          {/* BOTONES GUARDAR Y VOLVER */}
          <div className="activity-form-buttons">
            <Button variant="contained" onClick={handleSave} data-testid="activity-guardar-button">
              Guardar
            </Button>
            <Button variant="outlined" onClick={() => navigate('/activity')}>
              Volver
            </Button>
          </div>
        </div>
      </LocalizationProvider>
    </>
  )
}

export default ActivityNewEdit
